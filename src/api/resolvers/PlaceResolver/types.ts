import { InputType, Field } from "type-graphql";

@InputType()
export class PlaceIncludes {
  @Field(() => Boolean, { nullable: true })
  address?: Boolean;

  @Field(() => Boolean, { nullable: true })
  location?: Boolean;
}
