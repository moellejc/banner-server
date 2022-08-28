import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export interface AppContext {
  req: Request;
  res: Response;
  prisma: PrismaClient;
  jwtPayload?: { userID: number };
}
