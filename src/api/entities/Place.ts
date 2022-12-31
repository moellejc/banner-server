import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Prisma, PlaceTypes, PrismaClient } from "@prisma/client";
import { Location, locationFromCoords } from "./Location";
import { Address } from "./Address";
import { Organization } from "./Organization";
import { UserLocationPath } from "./UserLocationPath";
import { UserVisitHistory } from "./UserVisitHistory";
import { HereMapsPlace } from "../../lib/heremaps";
import { Coordinates } from "./Coordinates";

registerEnumType(PlaceTypes, {
  name: "PlaceTypes",
  description: undefined,
});

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
}

export const hereMapsPlaceToBannerPlace = (herePlace: HereMapsPlace): Place => {
  let place = new Place();
  place.name = herePlace.title!;
  place.language = herePlace.language!;
  place.placeType = PlaceTypes.Commercial;

  place.location = herePlace.position
    ? locationFromCoords({
        lat: herePlace.position?.lat,
        lon: herePlace.position?.lng,
      })
    : new Location();
  place.location.primaryCellLevel = 12; // TODO: adjust based on Here Maps type place
  if (herePlace.access) place.location.accessPoints = herePlace.access;

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
  if (herePlace.references)
    place.references = JSON.stringify(herePlace.references); // need to add HERE as a reference

  console.log(place);
  return place;
};
export const hereMapsPlacesToBannerPlaces = (
  herePlaces: HereMapsPlace[]
): Place[] => {
  let places: Place[] = [];
  herePlaces.forEach((p, i) => {
    places.push(hereMapsPlaceToBannerPlace(p));
  });
  return places;
};
