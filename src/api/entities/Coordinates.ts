import { Field, Int, ObjectType, Float } from "type-graphql";

@ObjectType()
export class Coordinates {
  @Field((type) => Float, { nullable: false })
  lat: number;

  @Field((type) => Float, { nullable: false })
  lon: number;
}
