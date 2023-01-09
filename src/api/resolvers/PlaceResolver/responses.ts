import { Field, ObjectType } from "type-graphql";
import { Place } from "../../entities/Place/Place";
import { FieldError } from "../../errors/FieldError";

@ObjectType()
export class PlacesResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Place], { nullable: true })
  places?: Place[];
}
@ObjectType()
export class PlaceResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Place, { nullable: true })
  place?: Place;
}
