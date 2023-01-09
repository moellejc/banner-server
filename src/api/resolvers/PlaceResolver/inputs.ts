import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CreatePlaceInput {
  @Field(() => String)
  name: String;
}
