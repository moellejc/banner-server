import { Field, Int, ObjectType, Float } from "type-graphql";
import { Place } from "../Place";

@ObjectType()
export class Organization {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => [Place], { nullable: true })
  places?: Place[] | null;
}
