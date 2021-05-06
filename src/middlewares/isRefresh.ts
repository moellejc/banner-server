import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { AppContext } from "../context/AppContext";

export const isRefresh: MiddlewareFn<AppContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  console.log(context.req.headers);

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    // authorization Header: bearer [token]
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    context.jwtPayload = payload as any;
  } catch (err) {
    throw new Error("not refresh token");
  }

  return next();
};
