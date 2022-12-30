import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Location } from "../entities/Location";
import { LocationInput } from "./inputs/LocationInputs";
import { Place, hereMapsPlacesToBannerPlaces } from "../entities/Place";
import { PlaceResponse, PlacesResponse } from "./responses/PlaceResponse";
import { AppContext } from "../../context/AppContext";
import h3 from "h3-js";
import { placesAtLocation, getAccessToken } from "../../lib/heremaps";
import { Coordinates } from "../entities/Coordinates";

@Resolver()
export class LocationResolver {
  @Query(() => PlacesResponse)
  async getPlacesFromLocation(
    @Arg("location", () => LocationInput) location: LocationInput,
    @Ctx() { prisma }: AppContext
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
      let dbPlaces = await prisma.place.findMany({
        where: {
          location: {
            geoCellRes7: { in: cellDisk },
          },
        },
      });

      // get places from Here Maps
      const token = await getAccessToken();
      let herePlaces = await placesAtLocation(coords.lat, coords.lon, token!);
      let herePlacesConverted = hereMapsPlacesToBannerPlaces(herePlaces?.data);

      // merge lists

      // add new place to database

      return { places: herePlacesConverted };
    } catch (err) {
      return { errors: [] };
    }
  }
}
