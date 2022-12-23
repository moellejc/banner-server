import { Field, Int, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
export class PostReply {
  @Field()
  id!: string;

  @Field()
  creatorID: string;

  @Field(() => User)
  creator!: User;

  @Field()
  postID: string;

  @Field(() => Post)
  post!: Post;

  @Field({ nullable: true })
  parentReplyId?: string;

  @Field(() => PostReply)
  parentReply?: PostReply;

  @Field(() => [PostReply])
  replies?: PostReply[];

  @Field(() => Int, { defaultValue: 0 })
  totalReplies: number;

  @Field()
  createdAt: Date;
}
