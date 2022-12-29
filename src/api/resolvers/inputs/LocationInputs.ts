import { Field, InputType } from "type-graphql";
import { Coordinates } from "../../entities/Coordinates";
import { Location } from "../../entities/Location";

@InputType()
export class LocationInput {
  @Field(() => Coordinates, { nullable: true })
  coords?: Coordinates | null;

  @Field(() => String, { nullable: true })
  cell?: string | null;
}
