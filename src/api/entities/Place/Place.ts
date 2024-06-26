import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { dzlClient } from "../../../lib/drizzle";
import { Location, fromCoords, createLocation } from "../Location";
import { Address, createAddress, addressFromGraphQLInput } from "../Address";
import { Organization } from "../Organization";
import { User, UserVisitHistory } from "../User";
import { places } from "../../schema/places";
import { CreatePlaceInput } from "../../resolvers/PlaceResolver";
import { HereMapsPlace } from "../../../lib/heremaps";
import { HereMapsReference } from "../../../lib/heremaps/types";
import { PlaceTypes } from "../../enums";
import h3 from "h3-js";

registerEnumType(PlaceTypes, {
  name: "PlaceTypes",
  description: undefined,
});

interface PlaceCreateRefOptions {
  createAddress?: boolean;
  createLocation?: boolean;
  connectAddressID?: number;
  connectLocationID?: number;
}

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
  createdByID?: number | null;

  @Field(() => User, { nullable: true })
  createdBy?: User | null;

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

  @Field(() => String, { nullable: true })
  references?: string | null;

  @Field(() => String, { nullable: true })
  categories?: string | null;

  @Field(() => String, { nullable: true })
  contacts?: string | null;

  @Field(() => String, { nullable: true })
  hours?: string | null;

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

  toCreateObject(createRefOptions?: PlaceCreateRefOptions): any {
    if (!createRefOptions)
      createRefOptions = { createAddress: false, createLocation: false };

    let placeCreateObj: any = {
      name: this.name,
      language: this.language,
      placeType: this.placeType,
      categories: this.categories ? this.categories : "",
      contacts: this.contacts ? this.contacts : "",
      references: this.references ? this.references : "",
      hours: this.hours ? this.hours : "",
    };

    // create new location
    if (createRefOptions.createLocation) {
      placeCreateObj = {
        ...placeCreateObj,
        location: {
          create: [this.location?.toCreateObject()],
        },
      };
    }

    // connect existing location
    if (createRefOptions.connectLocationID != undefined) {
      placeCreateObj = {
        ...placeCreateObj,
        locationID: createRefOptions.connectLocationID,
        // location: {
        //   connect: [{ id: createRefOptions.connectLocationID }],
        // },
      };
    }

    // create new address
    if (createRefOptions.createAddress) {
      placeCreateObj = {
        ...placeCreateObj,
        address: {
          create: [this.address?.toCreateObject()],
        },
      };
    }

    // connect existing address
    if (createRefOptions.connectAddressID != undefined) {
      placeCreateObj = {
        ...placeCreateObj,
        addressID: createRefOptions.connectAddressID,
        // address: {
        //   connect: [{ id: createRefOptions.connectAddressID }],
        // },
      };
    }

    // TODO: add references for parent and organization
    console.log(placeCreateObj);
    return placeCreateObj;
  }

  comparePlace(place: Place): number {
    // TODO: implement comparison threshold for places
    return 1;
  }

  isSamePlace(place: Place): boolean {
    // check address
    if (this.address?.countryCode != place.address?.countryCode) return false;
    if (this.address?.state != place.address?.state) return false;
    if (this.address?.city != place.address?.city) return false;
    if (this.address?.street != place.address?.street) return false;
    if (this.address?.houseNumber != place.address?.houseNumber) return false;

    return true;
  }

  inList(places: Place[]): boolean {
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
  place.name = herePlace.title ? herePlace.title : "NO TITLE AVAILABLE";
  place.language = herePlace.language ? herePlace.language : "en";
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

export const fromPlaceGraphQLInput = (input: CreatePlaceInput) => {
  const place = new Place();
  place.name = input.name;
  place.language = "en";
  place.placeType = input.placeType;
  place.location = fromCoords(input.coords!);
  place.address = addressFromGraphQLInput(input.address!);

  return place;
};

export const createPlace = async (place: Place): Promise<Place | undefined> => {
  try {
    // // create place
    // let bannerPlace = await prisma.place.create({
    //   data: place.toCreateObject({
    //     connectLocationID: undefined,
    //     connectAddressID: undefined,
    //   }),
    //   include: {
    //     location: true,
    //     address: true,
    //   },
    // });

    // create location
    let location = place.location
      ? await createLocation(place.location)
      : undefined;

    // create address
    let address = place.address
      ? await createAddress(place.address)
      : undefined;

    // create place
    const placeObj = place.toCreateObject();
    place.addressID = address?.id;
    place.locationID = location?.id;
    const [createdPlace] = await dzlClient
      .insert(places)
      .values({
        name: place.name,
        placeType: PlaceTypes.Commercial,
        locationID: place.locationID,
        addressID: place.addressID,
      })
      .returning();
    return createdPlace as Place;
    // return await prisma.place.create({
    //   data: place.toCreateObject({
    //     connectLocationID: location ? location.id : undefined,
    //     connectAddressID: address ? address.id : undefined,
    //   }),
    //   include: {
    //     location: true,
    //     address: true,
    //   },
    // });

    // return await prisma.place.create({
    //   data: place.toCreateObject({
    //     createAddress: true,
    //     createLocation: true,
    //   }),
    //   include: {
    //     location: true,
    //     address: true,
    //   },
    // });
  } catch (error) {
    console.log("CREATE PLACE ERROR");
    console.log(error);
  }

  return;
};

export const createPlaces = async (places: Place[]): Promise<Place[]> => {
  let placesAdded: Place[] = [];

  places.forEach(async (p) => {
    let newPlace = await createPlace(p);
    if (newPlace) placesAdded.push(newPlace);
  });

  return placesAdded;
};
