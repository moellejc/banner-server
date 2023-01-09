import { PlaceTypes } from "@prisma/client";
import { Field, Float, InputType, Int } from "type-graphql";

@InputType()
export class CreatePlaceInput {
  @Field(() => String)
  name: String;

  @Field(() => PlaceTypes)
  placeType: PlaceTypes;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lon: number;
}

@InputType()
export class UpdatePlaceInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name?: String;

  @Field(() => PlaceTypes)
  placeType?: PlaceTypes;

  @Field(() => Float)
  lat?: number;

  @Field(() => Float)
  lon?: number;
}
