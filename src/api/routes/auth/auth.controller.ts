import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { createAccessToken } from "../../../auth/auth";
import { User } from "../../entities/User";
import { users } from "../../schema";
import { dzlClient } from "../../../lib/drizzle";
import { eq, sql } from "drizzle-orm";

export default class AuthController {
  public refreshToken = async (req: Request, res: Response): Promise<any> => {
    const refreshToken = req.headers["refresh-token"] as string;

    if (!refreshToken) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    // token is valid and
    // we can send back an access token
    const user = await dzlClient.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, payload.userId),
    });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    return res.send({ ok: true, accessToken: createAccessToken(user as User) });
  };

  public logout = async (req: Request, res: Response): Promise<any> => {
    const refreshToken = req.headers["refresh-token"] as string;

    if (!refreshToken) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    // token is valid and
    // we can send back an access token
    const user = await dzlClient.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, payload.userId),
    });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    // increment token version by 1
    await dzlClient
      .update(users)
      .set({
        totalPosts: sql`${users.tokenVersion} + 1`,
      })
      .where(eq(users.id, payload.userId));

    return res.send({ ok: true });
  };
}
