import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { AppContext } from "../context/AppContext";

export const isRefresh: MiddlewareFn<AppContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  const refreshToken = context.req.headers["refresh_token"] as string;
  console.log(context.req.headers);

  if (!authorization || !refreshToken) {
    throw new Error("not authenticated: invalid headers");
  }

  try {
    // authorization Header: bearer [token]
    const payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    context.jwtPayload = payload as any;
  } catch (err) {
    throw new Error("not refresh token");
  }

  return next();
};
