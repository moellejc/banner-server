import { Field, ObjectType } from "type-graphql";
import { Place } from "../Place";
import { AddressInput } from "../../resolvers/AddressResolver";
import { dzlClient } from "../../../lib/drizzle";
import { addresses } from "../../schema";

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

    return createObj;
  }
}

export const createAddress = async (
  address: Address
): Promise<Address | undefined> => {
  try {
    const [addressDZL] = await dzlClient
      .insert(addresses)
      .values({ ...address.toCreateObject() })
      .returning();
    return addressDZL as Address;
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
