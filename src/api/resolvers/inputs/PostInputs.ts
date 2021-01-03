import { Point } from "geojson";
import { Field, InputType } from "type-graphql";
import { MediaScalar } from "../../../types/MediaScalar";
import { PointScalar } from "../../../types/Point";
import { Media } from "../../entities/Media";

@InputType()
export class PostCreateInput {
  @Field()
  text?: string;

  @Field(() => [MediaScalar], { nullable: true })
  media?: [Media];

  @Field()
  placeID?: String;

  @Field(() => PointScalar)
  coordinates: Point;
}
