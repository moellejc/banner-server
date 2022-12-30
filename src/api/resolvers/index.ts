import { PostResolver } from "./PostResolver";
import { UserResolver } from "./UserResolver";
import { LocationResolver } from "./LocationResolver";
import { Coordinates } from "../entities/Coordinates";

export const resolvers = [
  UserResolver,
  PostResolver,
  LocationResolver,
] as const;

export const orphanTypes = [Coordinates];
