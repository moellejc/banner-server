import { Point } from "geojson";
import { Field, Int, ObjectType } from "type-graphql";
import { PointScalar } from "../../types/Point";
import { Like } from "./Like";
import { Media } from "./Media";
import { PostReply } from "./PostReply";
import { User } from "./User";
import { LocationCell } from "./LocationCell";

@ObjectType()
export class Post {
  @Field()
  id!: string;

  @Field()
  creatorID!: string;

  @Field(() => User)
  creator!: User;

  @Field(() => Int, { nullable: true })
  cellID?: number | null;

  @Field(() => LocationCell, { nullable: true })
  cell?: LocationCell | null;

  @Field({ nullable: true })
  text: string;

  @Field(() => [Media])
  media: [Media];

  @Field(() => [PostReply])
  replies: [PostReply];

  @Field(() => Int, { defaultValue: 0 })
  replyCount: number;

  @Field(() => [Like])
  likes: [Like];

  @Field(() => Int, { defaultValue: 0 })
  likeCount: number;

  @Field()
  createdAt: Date;
}
