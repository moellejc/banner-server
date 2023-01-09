import { Field, Int, ObjectType, Float } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class UserLocationPath {
  @Field(() => Int)
  id: number;
}
