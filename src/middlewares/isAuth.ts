import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { AppContext } from "../context/AppContext";

export const isAuth: MiddlewareFn<AppContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  console.log(authorization);

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    // authorization Header: bearer [token]
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.jwtPayload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("not authenticated");
  }

  return next();
};
