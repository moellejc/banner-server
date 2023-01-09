import { Field, Int, ObjectType, Float } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class UserVisitHistory {
  @Field(() => Int)
  id: number;
}
