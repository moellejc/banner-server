import { Field, Int, ObjectType, Float } from "type-graphql";
import { PrismaClient, Address as AddressPrisma } from "@prisma/client";
import {
  serial,
  varchar,
  text,
  pgTable,
  timestamp,
  boolean,
  integer,
  pgEnum,
  json,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { Place } from "../Place/Place";
import { AddressInput } from "../../resolvers/AddressResolver";

@ObjectType()
export class Address {
  @Field()
  id: number;

  @Field()
  countryCode: string;

  @Field()
  countryName: string;

  @Field(() => String, { nullable: false })
  stateCode?: string | null;

  @Field(() => String, { nullable: false })
  state?: string | null;

  @Field(() => String, { nullable: false })
  county?: string | null;

  @Field(() => String, { nullable: false })
  city?: string | null;

  @Field(() => String, { nullable: false })
  district?: string | null;

  @Field(() => String, { nullable: false })
  street?: string | null;

  @Field(() => String, { nullable: false })
  houseNumber?: string | null;

  @Field(() => String, { nullable: false })
  postalCode: string;

  @Field(() => [Place], { nullable: true })
  places?: Place[] | null;

  toCreateObject(): any {
    let createObj: any = {
      countryCode: this.countryCode,
      countryName: this.countryName,
      state: this.state,
      stateCode: this.stateCode,
      county: this.county,
      city: this.city,
      district: this.district,
      street: this.street,
      houseNumber: this.houseNumber,
      postalCode: this.postalCode,
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

export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  countryCode: varchar("country_code", { length: 100 }),
  countryName: varchar("country_name", { length: 100 }),
  stateCode: varchar("state_code", { length: 100 }),
  state: varchar("state", { length: 100 }),
  county: varchar("county", { length: 100 }),
  city: varchar("city", { length: 100 }),
  district: varchar("district", { length: 100 }),
  street: varchar("street", { length: 100 }),
  postalCode: varchar("postal_code", { length: 100 }),
  houseNumber: varchar("house_number", { length: 100 }),
  // places      Place[]
});

export const createAddress = async (
  address: Address,
  prisma: PrismaClient
): Promise<AddressPrisma | undefined> => {
  try {
    return await prisma.address.create({
      data: address.toCreateObject(),
    });
  } catch (error) {
    console.log("CREATE ADDRESS ERROR");
    console.log(error);
  }

  return;
};

export const addressFromGraphQLInput = (input: AddressInput): Address => {
  const address = new Address();
  address.houseNumber = input.houseNumber;
  address.street = input.street;
  address.city = input.city;
  address.state = input.state;
  address.stateCode = input.stateCode;
  address.postalCode = input.postalCode;
  address.countryName = input.countryName;
  address.countryCode = input.countryCode;

  return address;
};
