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
import {
  CreatePlaceInput,
  GetPlaceInfoInput,
  GetPlaceGreetingInput,
} from "./inputs";
import {
  PlaceResponse,
  PlacesResponse,
  PlaceGreetingResponse,
} from "./responses";
import {
  Place,
  createPlace,
  fromPlaceGraphQLInput,
} from "../../entities/Place";
import { places } from "../../schema";
import { FieldError } from "../../errors";
import { eq, sql } from "drizzle-orm";
import { placeFromLocation } from "../../../lib/googlemaps";
import { greetMe } from "../../../lib/openai";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { exit } from "process";
import { assert } from "console";

@Resolver()
export class PlaceResolver {
  @Mutation(() => PlaceResponse)
  async createPlace(
    @Arg("placeData", () => CreatePlaceInput)
    placeData: CreatePlaceInput,
    @Ctx() { db }: AppContext
  ): Promise<PlaceResponse> {
    if (!placeData.coords || !placeData.address) return { errors: [] };

    let newPlaces = await createPlace(fromPlaceGraphQLInput(placeData));

    if (!newPlaces) return { errors: [] };

    return { place: newPlaces as Place };
  }

  @Mutation(() => PlacesResponse)
  async updatePlace(
    @Arg("placeData", () => CreatePlaceInput)
    placeData: CreatePlaceInput,
    @Ctx() { db }: AppContext
  ): Promise<void> {}

  @Query(() => PlacesResponse)
  async getPlaceInfo(
    @Arg("options", () => GetPlaceInfoInput)
    options: GetPlaceInfoInput,
    @Ctx() { db }: AppContext
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

  @Query(() => PlaceGreetingResponse)
  async getPlaceGreeting(
    @Arg("options", () => GetPlaceGreetingInput)
    options: GetPlaceGreetingInput,
    @Ctx() { db }: AppContext
  ): Promise<PlaceGreetingResponse> {
    let errors: FieldError[] = [];
    try {
      let gmPlaceInfoResponse = await placeFromLocation(options.coords);

      let placeInfo = {} as Partial<PlaceData>;

      for (let i = 0; i < gmPlaceInfoResponse.data.results.length; i++) {
        const place = gmPlaceInfoResponse.data.results[i];

        // find the first restaurant and exit
        if (place.types) {
          for (let i = 0; i < place.types.length; i++) {
            const t = place.types[i];
            if (t == "restaurant" && place.name) {
              placeInfo = place;
              exit;
            }
          }
        }
      }
      if (placeInfo.name) {
        let placeType = placeInfo.types ? placeInfo.types[0] : "";
        let greeting = await greetMe(placeInfo.name, placeType);

        return { errors, greeting };
      }
    } catch (error) {
      errors.push({ message: `${error}` });
    }

    return { errors };
  }
}
