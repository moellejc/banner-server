import { Field, Int, ObjectType } from "type-graphql";
import { LocationCell } from "./LocationCell";

@ObjectType()
export class Place {
  @Field()
  id: number;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Int, { nullable: true })
  cellID?: number | null;

  @Field(() => LocationCell, { nullable: true })
  cell?: LocationCell | null;

  @Field()
  streetNum: string;

  @Field()
  street: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  stateCode: string;

  @Field()
  postalCode: string;

  @Field()
  county: string;

  @Field()
  countryName: string;

  @Field()
  countryCode: string;

  @Field()
  peopleHere: number;

  @Field({ nullable: false })
  createdAt: Date;
}
