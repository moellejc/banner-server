import { Field, ObjectType } from "type-graphql";
import { Place } from "../../entities/Place";
import { FieldError } from "../../errors/FieldError";

@ObjectType()
export class PlaceResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Place, { nullable: true })
  place?: Place;
}
