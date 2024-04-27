// import { PlaceTypes } from "@prisma/client";
import { Field, Float, InputType, Int } from "type-graphql";
import { Coordinates } from "../../entities/Coordinates/Coordinates";
import { AddressInput } from "../AddressResolver";
import { PlaceIncludes } from "./types";
import { PlaceTypes } from "../../entities/Place";

@InputType()
export class CreatePlaceInput {
  @Field(() => String)
  name: string;

  @Field(() => PlaceTypes)
  placeType: PlaceTypes;

  @Field(() => Coordinates, { nullable: true })
  coords?: Coordinates | null;

  @Field(() => AddressInput, { nullable: true })
  address?: AddressInput;
}

@InputType()
export class UpdatePlaceInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name?: String;

  @Field(() => PlaceTypes)
  placeType?: PlaceTypes;

  @Field(() => Coordinates, { nullable: true })
  coords?: Coordinates | null;
}

@InputType()
export class GetPlaceInfoInput {
  @Field(() => Int)
  id: number;

  @Field(() => PlaceIncludes, { nullable: true })
  includes?: PlaceIncludes;
}
