import { Field, Int, ObjectType, Float, registerEnumType } from "type-graphql";
import {
  LocationTypes,
  PrismaClient,
  Location as LocationPrisma,
} from "@prisma/client";
import { User } from "../User";
import { Post } from "../Post";
import { Place } from "../Place";
import { Coordinates } from "../Coordinates";
import h3 from "h3-js";

const DEFAULT_LEVEL = 12;

registerEnumType(LocationTypes, {
  name: "LocationTypes",
  description: "LocationTypes",
});

@ObjectType()
export class Location {
  @Field(() => Int)
  id: number;

  @Field(() => LocationTypes, {
    nullable: false,
  })
  locationType: LocationTypes;

  @Field(() => Int, { defaultValue: DEFAULT_LEVEL })
  primaryCellLevel: number;

  @Field(() => Float, { nullable: false })
  lat: number;

  @Field(() => Float, { nullable: false })
  lon: number;

  // Avg Edge: 1107.712591(km) 688.301(mi)
  @Field(() => String, { nullable: false })
  geoCellRes0: string;

  // Avg Edge: 418.6760055(km) 260.153(mi)
  @Field(() => String, { nullable: false })
  geoCellRes1: string;

  // Avg Edge: 158.2446558(km) 98.329(mi)
  @Field(() => String, { nullable: false })
  geoCellRes2: string;

  // Avg Edge: 59.81085794(km) 37.165(mi)
  @Field(() => String, { nullable: false })
  geoCellRes3: string;

  // Avg Edge: 22.6063794(km) 22.047(mi)
  @Field(() => String, { nullable: false })
  geoCellRes4: string;

  // Avg Edge: 8.544408276(km) 5.309(mi)
  @Field(() => String, { nullable: false })
  geoCellRes5: string;

  // Avg Edge: 3.229482772(km) 2.007(mi)
  @Field(() => String, { nullable: false })
  geoCellRes6: string;

  // Avg Edge: 1.220629759(km) 4004.691(ft)
  @Field(() => String, { nullable: false })
  geoCellRes7: string;

  // Avg Edge: 0.461354684(km) 1513.631(ft)
  @Field(() => String, { nullable: false })
  geoCellRes8: string;

  // Avg Edge: 0.174375668(km) 572.099(ft)
  @Field(() => String, { nullable: false })
  geoCellRes9: string;

  // Avg Edge: 0.065907807(km) 216.233(ft)
  @Field(() => String, { nullable: false })
  geoCellRes10: string;

  // Avg Edge: 0.024910561(km) 81.728(ft)
  @Field(() => String, { nullable: false })
  geoCellRes11: string;

  // Avg Edge: 0.009415526(km) 30.891(ft)
  @Field(() => String, { nullable: false })
  geoCellRes12: string;

  // Avg Edge: 0.003559893(km) 11.679(ft)
  @Field(() => String, { nullable: false })
  geoCellRes13: string;

  // Avg Edge: 0.001348575(km) 4.424(ft)
  @Field(() => String, { nullable: false })
  geoCellRes14: string;

  // Avg Edge: 0.000509713(km) 1.672(ft)
  @Field(() => String, { nullable: false })
  geoCellRes15: string;

  @Field({ nullable: true })
  bbox: string;

  @Field({ nullable: true })
  accessPoints: string;

  @Field(() => Date, { nullable: false })
  updatedAt: Date;

  @Field(() => Date, { nullable: false })
  createdAt: Date;

  @Field(() => [User], { nullable: true })
  users?: User[] | null;

  @Field(() => [Post], { nullable: true })
  posts?: Post[] | null;

  @Field(() => [Place], { nullable: true })
  places?: Place[] | null;

  toCreateObject(): any {
    let createObj: any = {
      lat: this.lat,
      lon: this.lon,
      locationType: this.locationType ? this.locationType : LocationTypes.Place,
      primaryCellLevel: this.primaryCellLevel
        ? this.primaryCellLevel
        : DEFAULT_LEVEL,
      accessPoints: this.accessPoints,
      bbox: this.bbox ? this.bbox : "",
      geoCellRes0: this.geoCellRes0,
      geoCellRes1: this.geoCellRes1,
      geoCellRes2: this.geoCellRes2,
      geoCellRes3: this.geoCellRes3,
      geoCellRes4: this.geoCellRes4,
      geoCellRes5: this.geoCellRes5,
      geoCellRes6: this.geoCellRes6,
      geoCellRes7: this.geoCellRes7,
      geoCellRes8: this.geoCellRes8,
      geoCellRes9: this.geoCellRes9,
      geoCellRes10: this.geoCellRes10,
      geoCellRes11: this.geoCellRes11,
      geoCellRes12: this.geoCellRes12,
      geoCellRes13: this.geoCellRes13,
      geoCellRes14: this.geoCellRes14,
      geoCellRes15: this.geoCellRes15,
    };

    // if (placeID)
    //   createObj = {
    //     ...createObj,
    //     places: {
    //       connect: [{ id: placeID }],
    //     },
    //   };

    return createObj;
  }
}

export const fromCoords = (coords: Coordinates): Location => {
  let loc = new Location();
  loc.lat = coords.lat;
  loc.lon = coords.lon;
  loc.primaryCellLevel = DEFAULT_LEVEL;
  loc.geoCellRes0 = h3.latLngToCell(coords.lat, coords.lon, 0);
  loc.geoCellRes1 = h3.latLngToCell(coords.lat, coords.lon, 1);
  loc.geoCellRes2 = h3.latLngToCell(coords.lat, coords.lon, 2);
  loc.geoCellRes3 = h3.latLngToCell(coords.lat, coords.lon, 3);
  loc.geoCellRes4 = h3.latLngToCell(coords.lat, coords.lon, 4);
  loc.geoCellRes5 = h3.latLngToCell(coords.lat, coords.lon, 5);
  loc.geoCellRes6 = h3.latLngToCell(coords.lat, coords.lon, 6);
  loc.geoCellRes7 = h3.latLngToCell(coords.lat, coords.lon, 7);
  loc.geoCellRes8 = h3.latLngToCell(coords.lat, coords.lon, 8);
  loc.geoCellRes9 = h3.latLngToCell(coords.lat, coords.lon, 9);
  loc.geoCellRes10 = h3.latLngToCell(coords.lat, coords.lon, 10);
  loc.geoCellRes11 = h3.latLngToCell(coords.lat, coords.lon, 11);
  loc.geoCellRes12 = h3.latLngToCell(coords.lat, coords.lon, 12);
  loc.geoCellRes13 = h3.latLngToCell(coords.lat, coords.lon, 13);
  loc.geoCellRes14 = h3.latLngToCell(coords.lat, coords.lon, 14);
  loc.geoCellRes15 = h3.latLngToCell(coords.lat, coords.lon, 15);

  return loc;
};

export const createLocation = async (
  location: Location,
  prisma: PrismaClient
): Promise<LocationPrisma | undefined> => {
  try {
    return await prisma.location.create({
      data: location.toCreateObject(),
    });
  } catch (error) {
    console.log("CREATE LOCATION ERROR");
    console.log(error);
  }

  return;
};
