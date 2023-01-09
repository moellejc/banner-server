import { Field, Int, ObjectType } from "type-graphql";
import { Post } from "../Post/Post";
import { User } from "../User/User";

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
