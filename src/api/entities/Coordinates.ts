import { Field, Int, ObjectType, Float } from "type-graphql";

@ObjectType()
export class Coordinates {
  constructor(lat?: number, lon?: number) {
    if (lat && lon) {
      this.lat = lat;
      this.lon = lon;
    }
  }

  @Field((type) => Float, { nullable: false })
  lat: number;

  @Field((type) => Float, { nullable: false })
  lon: number;
}
