import { Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../api/entities/User";

export const createAccessToken = (user: User) => {
  return sign({ userID: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: process.env.ACCESS_EXPIRATION,
  });
};

export const createRefreshToken = (user: User) => {
  return sign({ userID: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: process.env.REFRESH_EXPIRATION,
  });
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};
