import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Post } from "../Post";
import { User } from "../User";
import { MediaTypes, MediaExtensions } from "../../enums";

registerEnumType(MediaTypes, {
  name: "MediaTypes",
  description: undefined,
});

registerEnumType(MediaExtensions, {
  name: "MediaExtensions",
  description: undefined,
});

@ObjectType()
export class Media {
  @Field()
  id!: string;

  @Field()
  creatorID: string;

  @Field(() => User)
  creator: User;

  @Field()
  postID: string;

  @Field(() => Post)
  post: Post;

  @Field(() => MediaTypes)
  mediaType!: MediaTypes;

  @Field()
  mediaURL: string;

  @Field(() => Int, { defaultValue: 0 })
  mediaIndex: number;

  @Field()
  createdAt: Date;
}
