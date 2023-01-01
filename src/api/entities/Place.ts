import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import {
  Prisma,
  PlaceTypes,
  PrismaClient,
  PrismaPromise,
  Place as PlacePris,
} from "@prisma/client";
import { Location, fromCoords } from "./Location";
import { Address } from "./Address";
import { Organization } from "./Organization";
import { UserLocationPath } from "./UserLocationPath";
import { UserVisitHistory } from "./UserVisitHistory";
import { HereMapsPlace } from "../../lib/heremaps";
import { HereMapsReference } from "../../lib/heremaps/types";
import h3 from "h3-js";

registerEnumType(PlaceTypes, {
  name: "PlaceTypes",
  description: undefined,
});

const placeInclude = Prisma.validator<Prisma.PlaceInclude>()({
  address: true,
  location: true,
});

export type PlaceWithIncludes = Prisma.PlaceGetPayload<{
  include: typeof placeInclude;
}>;

@ObjectType()
export class Place {
  @Field()
  id: number;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  language: string;

  @Field(() => PlaceTypes, { nullable: false })
  placeType: PlaceTypes;

  @Field(() => Int, { nullable: true })
  locationID?: number | null;

  @Field(() => Location, { nullable: true })
  location?: Location | null;

  @Field(() => Int, { nullable: true })
  parentID?: number | null;

  @Field(() => Place, { nullable: true })
  parent?: Place | null;

  @Field(() => [Place], { nullable: true })
  children?: Place[] | null;

  @Field(() => Int, { nullable: true })
  addressID?: number | null;

  @Field(() => Address, { nullable: true })
  address?: Address | null;

  @Field({ nullable: true })
  references: string;

  @Field({ nullable: true })
  categories: string;

  @Field({ nullable: true })
  contacts: string;

  @Field({ nullable: true })
  hours: string;

  @Field(() => Int, { nullable: true })
  organizationID?: number | null;

  @Field(() => Organization, { nullable: true })
  organization?: Organization | null;

  @Field({ defaultValue: 0 })
  peopleHere: number;

  @Field(() => [UserVisitHistory], { nullable: true })
  visitorHistory?: UserVisitHistory[] | null;

  @Field({ nullable: false })
  updatedAt: Date;

  @Field({ nullable: false })
  createdAt: Date;

  toCreateObject(): any {
    // TODO: update with parent if applicable
    return {
      name: this.name,
      language: this.language,
      placeType: this.placeType,
      location: {
        create: [
          {
            lat: this.location?.lat,
            lon: this.location?.lon,
            locationType: this.location?.locationType,
            primaryCellLevel: this.location?.primaryCellLevel,
            accessPoints: this.location?.accessPoints,
            geoCellRes0: this.location?.geoCellRes0,
            geoCellRes1: this.location?.geoCellRes1,
            geoCellRes2: this.location?.geoCellRes2,
            geoCellRes3: this.location?.geoCellRes3,
            geoCellRes4: this.location?.geoCellRes4,
            geoCellRes5: this.location?.geoCellRes5,
            geoCellRes6: this.location?.geoCellRes6,
            geoCellRes7: this.location?.geoCellRes7,
            geoCellRes8: this.location?.geoCellRes8,
            geoCellRes9: this.location?.geoCellRes9,
            geoCellRes10: this.location?.geoCellRes10,
            geoCellRes11: this.location?.geoCellRes11,
            geoCellRes12: this.location?.geoCellRes12,
            geoCellRes13: this.location?.geoCellRes13,
            geoCellRes14: this.location?.geoCellRes14,
            geoCellRes15: this.location?.geoCellRes15,
          },
        ],
      },
      address: {
        create: [
          {
            countryCode: this.address?.countryCode,
            countryName: this.address?.countryName,
            state: this.address?.state,
            stateCode: this.address?.stateCode,
            county: this.address?.county,
            city: this.address?.city,
            district: this.address?.district,
            street: this.address?.state,
            houseNumbe: this.address?.houseNumber,
            postalCode: this.address?.postalCode,
          },
        ],
      },
      categories: this.categories,
      contacts: this.contacts,
      references: this.references,
      hours: this.hours,
    };
  }

  comparePlace(place: Place): number {
    // TODO: implement comparison threshold for places
    return 1;
  }

  isSamePlace(place: Place | PlaceWithIncludes): boolean {
    // check address
    if (this.address?.countryCode != place.address?.countryCode) return false;
    if (this.address?.state != place.address?.state) return false;
    if (this.address?.city != place.address?.city) return false;
    if (this.address?.street != place.address?.street) return false;
    if (this.address?.houseNumber != place.address?.houseNumber) return false;

    return true;
  }

  inList(places: Place[] | PlaceWithIncludes[]): boolean {
    let foundSamePlace = false;
    let castPlaces = places as Place[];
    castPlaces.every((p) => {
      if (this.isSamePlace(p)) {
        foundSamePlace = true;
        return false; // ".every" breaks when falsey is returned
      }
    });
    return foundSamePlace;
  }
}

export const fromBannerPlace = (herePlace: HereMapsPlace): Place => {
  let place = new Place();
  place.name = herePlace.title!;
  place.language = herePlace.language!;
  place.placeType = PlaceTypes.Commercial;

  place.location = herePlace.position
    ? fromCoords({
        lat: herePlace.position?.lat,
        lon: herePlace.position?.lng,
      })
    : new Location();
  place.location.primaryCellLevel = 12; // TODO: adjust based on Here Maps type place
  if (herePlace.access)
    place.location.accessPoints = JSON.stringify(
      herePlace.access.map((coords, i) => {
        return h3.latLngToCell(coords.lat, coords.lng, 15);
      })
    );

  place.address = new Address();
  if (herePlace.address) {
    if (herePlace.address.countryCode)
      place.address.countryCode = herePlace.address.countryCode;
    if (herePlace.address.countryName)
      place.address.countryName = herePlace.address.countryName;
    if (herePlace.address.state) place.address.state = herePlace.address.state;
    if (herePlace.address.stateCode)
      place.address.stateCode = herePlace.address.stateCode;
    if (herePlace.address.county)
      place.address.county = herePlace.address.county;
    if (herePlace.address.city) place.address.city = herePlace.address.city;
    if (herePlace.address.district)
      place.address.district = herePlace.address.district;
    if (herePlace.address.street)
      place.address.street = herePlace.address.street;
    if (herePlace.address.houseNumber)
      place.address.houseNumber = herePlace.address.houseNumber;
    if (herePlace.address.postalCode)
      place.address.postalCode = herePlace.address.postalCode;
  }

  if (herePlace.categories)
    place.categories = JSON.stringify(herePlace.categories);
  if (herePlace.contacts) place.contacts = JSON.stringify(herePlace.contacts);
  if (herePlace.openingHours)
    place.hours = JSON.stringify(herePlace.openingHours);
  if (herePlace.references) {
    herePlace.references.push({
      supplier: {
        id: "HERE",
      },
      id: herePlace.id,
    } as HereMapsReference);
    place.references = JSON.stringify(herePlace.references);
  }

  return place;
};
export const fromBannerPlaces = (herePlaces: HereMapsPlace[]): Place[] => {
  let places: Place[] = [];
  herePlaces.forEach((p, i) => {
    places.push(fromBannerPlace(p));
  });
  return places;
};

export const upsertPlaces = async (
  places: Place[],
  prisma: PrismaClient
): Promise<boolean> => {
  let placesToAdd: any[] = [];

  places.forEach(async (p) => {
    let foundPlaces = await prisma.$queryRawUnsafe(
      "SELECT id FROM places INNER JOIN addresses ON places.addressID = addresses.id WHERE addresses.countryName = '$1' AND addresses.state = $2 AND addresses.city = $3 AND addresses.street = $4 AND addresses.houseNumber = $5 AND addresses.postalCode = $6",
      p.address?.countryName,
      p.address?.state,
      p.address?.city,
      p.address?.street,
      p.address?.houseNumber,
      p.address?.postalCode
    );

    if (foundPlaces) placesToAdd.push(p.toCreateObject());
  });

  await prisma.place.createMany({
    data: placesToAdd,
  });
  return true;
};
