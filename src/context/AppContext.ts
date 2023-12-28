import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { dzlClient } from "../lib/drizzle";

export interface AppContext {
  req: Request;
  res: Response;
  db: typeof dzlClient;
  prisma: PrismaClient;
  jwtPayload?: { userID: number };
}
