import { PostResolver } from "./PostResolver/resolver";
import { UserResolver } from "./UserResolver";
import { LocationResolver } from "./LocationResolver";
import { PlaceResolver } from "./PlaceResolver";
import { Coordinates } from "../entities/Coordinates";

export const resolvers = [
  UserResolver,
  PostResolver,
  LocationResolver,
  PlaceResolver,
] as const;

export const orphanTypes = [Coordinates];
