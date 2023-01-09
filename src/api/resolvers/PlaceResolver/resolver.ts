import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  Field,
  ObjectType,
} from "type-graphql";
import { AppContext } from "../../../context/AppContext";
import { PlaceResponse, PlacesResponse } from "./responses";
import { CreatePlaceInput } from "./inputs";

@Resolver()
export class PlaceResolver {
  @Mutation(() => PlacesResponse)
  async getPlacesFromLocation(
    @Arg("createPlaceInfo", () => CreatePlaceInput)
    createPlaceInfo: CreatePlaceInput,
    @Ctx() { prisma }: AppContext
  ): Promise<void> {}
}
