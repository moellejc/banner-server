import { Field, Int, ObjectType, Float } from "type-graphql";
import { PrismaClient, Address as AddressPrisma } from "@prisma/client";
import { Place } from "./Place";

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
    return {
      countryCode: this.countryCode,
      countryName: this.countryName,
      state: this.state,
      stateCode: this.stateCode,
      county: this.county,
      city: this.city,
      district: this.district,
      street: this.state,
      houseNumbe: this.houseNumber,
      postalCode: this.postalCode,
    };
  }
}

export const createAddress = async (
  address: Address,
  prisma: PrismaClient
): Promise<AddressPrisma | undefined> => {
  try {
    return await prisma.address.create({
      data: address.toCreateObject(),
    });
  } catch (error) {
    console.log(error);
  }

  return;
};
