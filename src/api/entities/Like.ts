import { Field, Int, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
export class Like {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  userID: number;

  @Field(() => User)
  user: User;

  @Field(() => Int)
  postID: number;

  @Field(() => Post)
  post: Post;

  @Field(() => Date)
  createdAt: Date;
}
