import { Field, Int, ObjectType } from "type-graphql";
import { Post } from "../Post";
import { User } from "../User";

@ObjectType()
export class Like {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  likerID: number;

  @Field(() => User)
  liker: User;

  @Field(() => Int)
  postID: number;

  @Field(() => Post)
  post: Post;

  @Field(() => Date)
  createdAt: Date;
}
