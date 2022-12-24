import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { LocationCell } from "../entities/LocationCell";
import { Place } from "../entities/Place";
import { PlaceResponse } from "./responses/PlaceResponse";
import { AppContext } from "../../context/AppContext";

@Resolver()
export class LocationResolver {
  @Query(() => Place)
  async getPlaceFromLocation(
    @Arg("cell", () => LocationCell) cell: LocationCell,
    @Ctx() { prisma }: AppContext
  ): Promise<PlaceResponse> {
    try {
      // look for place in data

      // look for place from ReverseGeocode

      // add place to database

      // return place

      // return { user: await prisma.user.findUniqueOrThrow({ where: { id } }) };
      return {
        place: await prisma.place.findUniqueOrThrow({ where: { id: 0 } }),
      };
    } catch (err) {
      return { errors: [] };
    }
  }
}
