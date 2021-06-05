import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getConnection } from "typeorm";
import { createAccessToken } from "../../../auth/auth";
import { User } from "../../entities/User";

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
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    return res.send({ ok: true, accessToken: createAccessToken(user) });
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
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    // increment token version by 1
    await getConnection()
      .getRepository(User)
      .increment({ id: user.id }, "tokenVersion", 1);

    return res.send({ ok: true });
  };
}
