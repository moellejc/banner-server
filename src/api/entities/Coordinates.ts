import { Field, Int, ObjectType, InputType, Float } from "type-graphql";

@InputType()
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
