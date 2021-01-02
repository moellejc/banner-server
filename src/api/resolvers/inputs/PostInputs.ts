import { Point } from "geojson";
import { Field, InputType } from "type-graphql";
import { PointScalar } from "../../../types/Point";

@InputType()
export class PostCreateInput {
  @Field()
  creatorID!: string;

  @Field()
  text?: string;

  //   @Field()
  //   media?: string;

  @Field()
  placeID?: String;

  @Field(() => PointScalar)
  coordinates: Point;
}
