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
import { CreatePlaceInput, GetPlaceInfoInput } from "./inputs";
import { PlaceResponse, PlacesResponse } from "./responses";
import {
  Place,
  places,
  createPlace,
  fromPlaceGraphQLInput,
} from "../../entities/Place";
import { FieldError } from "../../errors";
import { Prisma } from "@prisma/client";
import { eq, sql } from "drizzle-orm";

@Resolver()
export class PlaceResolver {
  @Mutation(() => PlaceResponse)
  async createPlace(
    @Arg("placeData", () => CreatePlaceInput)
    placeData: CreatePlaceInput,
    @Ctx() { prisma }: AppContext
  ): Promise<PlaceResponse> {
    if (!placeData.coords || !placeData.address) return { errors: [] };

    let newPlaces = await createPlace(fromPlaceGraphQLInput(placeData), prisma);

    if (!newPlaces) return { errors: [] };

    return { place: newPlaces as Place };
  }

  @Mutation(() => PlacesResponse)
  async updatePlace(
    @Arg("placeData", () => CreatePlaceInput)
    placeData: CreatePlaceInput,
    @Ctx() { prisma }: AppContext
  ): Promise<void> {}

  @Query(() => PlacesResponse)
  async getPlaceInfo(
    @Arg("options", () => GetPlaceInfoInput)
    options: GetPlaceInfoInput,
    @Ctx() { db, prisma }: AppContext
  ): Promise<PlaceResponse> {
    if (!options.id) return { errors: [] };

    let errors: FieldError[] = [];
    try {
      let [foundPlace] = await db
        .select()
        .from(places)
        .where(eq(places.id, options.id));
      // let foundPlace = await prisma.place.findUniqueOrThrow({
      //   where: {
      //     id: options.id,
      //   },
      //   include: options.includes
      //     ? (options.includes as Prisma.PlaceInclude)
      //     : {},
      // });

      return { place: foundPlace as Place };
    } catch (error) {
      errors.push({
        field: "id",
        message: `Place with id ${options.id} not found`,
      });
    }

    return { errors };
  }
}
