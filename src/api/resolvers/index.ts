import { PostResolver } from "./PostResolver";
import { UserResolver } from "./UserResolver";

export const resolvers = [UserResolver, PostResolver] as const;
