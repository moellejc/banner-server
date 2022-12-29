import { Field, Int, ObjectType, Float } from "type-graphql";
import { Place } from "./Place";

@ObjectType()
export class Address {
  @Field()
  id: number;

  @Field()
  countryCode: string;

  @Field()
  countryName: string;

  @Field({ nullable: false })
  stateCode?: string | null;

  @Field({ nullable: false })
  state?: string | null;

  @Field({ nullable: false })
  county?: string | null;

  @Field({ nullable: false })
  city?: string | null;

  @Field({ nullable: false })
  district?: string | null;

  @Field({ nullable: false })
  street?: string | null;

  @Field({ nullable: false })
  houseNumber?: string | null;

  @Field({ nullable: false })
  postalCode: string;

  @Field(() => [Place], { nullable: true })
  places?: Place[] | null;
}
