import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { diskGridFromLocation } from "../../entities/Location";
import { LocationInput } from "./inputs";
import {
  Place,
  places,
  fromBannerPlace,
  fromBannerPlaces,
  createPlaces,
  PlaceWithIncludes,
} from "../../entities/Place";
import { PlaceResponse, PlacesResponse } from "../PlaceResolver/responses";
import { AppContext } from "../../../context/AppContext";
import h3 from "h3-js";
import {
  HereMapsPlace,
  placesAtLocation,
  getAccessToken,
  reverseGeocode,
} from "../../../lib/heremaps";
import { Coordinates } from "../../entities/Coordinates";
import { FieldError } from "../../errors";
import { locations } from "../../entities/Location";
import { relations, eq, sql, inArray } from "drizzle-orm";
import { addresses } from "../../entities/Address";

@Resolver()
export class LocationResolver {
  @Query(() => PlacesResponse)
  async getPlacesFromLocation(
    @Arg("location", () => LocationInput) location: LocationInput,
    @Ctx() { db, prisma }: AppContext
  ): Promise<PlacesResponse> {
    if (!location.coords && !location.cell) return { errors: [] };

    try {
      // get cell and coords from input
      let cell = location.cell
        ? location.cell
        : h3.latLngToCell(location.coords?.lat!, location.coords?.lon!, 7);
      let coords = location.coords
        ? location.coords
        : ((): Coordinates => {
            let tempCoordList = h3.cellToLatLng(cell);
            return { lat: tempCoordList[0], lon: tempCoordList[1] };
          })();
      let cellDisk = h3.gridDisk(cell, 1);

      // get all the places in the disk around the current location
      let dbPlaces: PlaceWithIncludes[] = [];
      try {
        const foundPlaces = await db
          .select()
          .from(places)
          .rightJoin(locations, eq(places.locationID, locations.id))
          .where(inArray(locations.geoCellRes7, cellDisk))
          .leftJoin(addresses, eq(places.addressID, addresses.id));
        // dbPlaces = foundPlaces as PlaceWithIncludes[];

        dbPlaces = await prisma.place.findMany({
          where: {
            location: {
              geoCellRes7: { in: cellDisk },
            },
          },
          include: {
            address: true,
            location: true,
          },
        });
      } catch (error) {
        console.log("Failed to find places in cell");
      }

      // get places from Here Maps]
      let mergedPlaces: Place[] = dbPlaces as Place[];
      if (!dbPlaces || dbPlaces.length < 5) {
        const token = await getAccessToken();
        let herePlaces = await placesAtLocation(coords.lat, coords.lon, token!);
        let herePlacesConverted = fromBannerPlaces(
          herePlaces?.data.items as HereMapsPlace[]
        );

        // merge lists
        let newPlaces: Place[] = [];
        herePlacesConverted.forEach((p) => {
          if (!dbPlaces || dbPlaces.length <= 0 || !p.inList(dbPlaces)) {
            mergedPlaces.push(p);
            newPlaces.push(p);
          }
        });

        // add new place to database
        try {
          return { places: (await createPlaces(newPlaces, prisma)) as Place[] };
        } catch (error) {
          console.log(error);
        }
      }

      return { places: mergedPlaces };
    } catch (err) {
      return { errors: [] };
    }
  }

  @Query(() => PlaceResponse, {
    description: "Return an address and information given Lat/Lon coords",
  })
  async getReverseGeocode(
    @Arg("options", () => LocationInput) options: LocationInput,
    @Ctx() { prisma }: AppContext
  ): Promise<PlaceResponse> {
    if (!options.coords && !options.cell) return { errors: [] };
    const coords = options.coords
      ? options.coords
      : ((c: h3.CoordPair) => {
          return { lat: c[0], lon: c[1] };
        })(h3.cellToLatLng(options.cell!));

    const token = await getAccessToken();
    const herePlace = await reverseGeocode(coords.lat, coords.lon, token!);

    if (!herePlace || !herePlace.data.items[0]) return { errors: [] };

    const place = fromBannerPlace(herePlace.data.items[0]);
    place.id = -1; // TODO: should probably handle this temporary id more gracefully

    return { place };
  }

  @Query(() => PlacesResponse)
  async getNearInfo(
    @Arg("options", () => LocationInput) options: LocationInput,
    @Ctx() { prisma }: AppContext
  ): Promise<PlacesResponse> {
    if (!options.coords && !options.cell) return { errors: [] };

    const cellDisk = diskGridFromLocation(7, options.coords!, options.cell!);

    let errors: FieldError[] = [];
    try {
      const dbPlaces = await prisma.place.findMany({
        where: {
          location: {
            geoCellRes7: { in: cellDisk },
          },
        },
        include: {
          address: true,
          location: true,
        },
      });
      return { places: dbPlaces as Place[] };
    } catch (error) {
      errors.push({
        field: "id",
        message: `Places not found near coords:${options.coords} | cell:${options.cell}`,
      });
    }

    return { errors };
  }

  @Query(() => PlacesResponse)
  async getHereInfo(
    @Arg("options", () => LocationInput) options: LocationInput,
    @Ctx() { prisma }: AppContext
  ): Promise<void> {}
}
