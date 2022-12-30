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
}
