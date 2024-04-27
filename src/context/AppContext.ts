import { Request, Response } from "express";
import { dzlClient } from "../lib/drizzle";

export interface AppContext {
  req: Request;
  res: Response;
  db: typeof dzlClient;
  jwtPayload?: { userID: number };
}
