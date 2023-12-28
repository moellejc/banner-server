import argon2 from "argon2";
import { validate } from "class-validator";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../../../auth/auth";
import { User, users } from "../../entities/User/User";
import { DUPLICATE_ENTRY } from "../../../constants/ErrorCodes";
import { AppContext } from "../../../context/AppContext";
import { isAuth } from "../../../middlewares";
import { convertValidationErrors } from "../../errors/FieldError";
import {
  EmailExistsError,
  GenericUserInsertError,
  InvalidCredentialsError,
  ScreenNameExistsError,
  UserDoesNotExistError,
  UserNotFound,
} from "../../errors/UserErrors";
import {
  UserCheckEmailScreenNameInputs,
  UserLoginInput,
  UserRegisterInput,
  UserUpdateInput,
} from "./inputs";
import { LoginResponse, RegisterResponse, UserResponse } from "./responses";
import { latLngToAllCellLevels } from "../../../utils/CellUtils";
import { LocationTypes } from "@prisma/client";
import { dzlClient } from "../../../lib/drizzle/index";
import { eq, sql } from "drizzle-orm";

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async checkEmail(
    @Arg("options", () => UserCheckEmailScreenNameInputs)
    options: UserCheckEmailScreenNameInputs
  ): Promise<UserResponse> {
    const errors = convertValidationErrors(await validate(options));
    if (errors.length > 0) {
      return { errors };
    }

    // no existing users with email or screen name
    return { errors: [] };
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Arg("options", () => UserRegisterInput) options: UserRegisterInput,
    @Ctx() { res, db, prisma }: AppContext
  ): Promise<RegisterResponse> {
    const errors = convertValidationErrors(await validate(options));
    if (errors.length > 0) {
      return { errors };
    }

    // hash password
    const hashedPassword = await argon2.hash(options.password);
    let user!: User;

    // calculate h3 cell
    let cellsLevels = latLngToAllCellLevels(options.lat!, options.lon!);

    try {
      let [userDZL] = await db
        .insert(users)
        .values({
          firstName: options.firstName,
          lastName: options.lastName,
          screenName: options.screenName,
          email: options.email,
          password: hashedPassword,
        })
        .returning();
      user = userDZL as User;
      // user = await prisma.user.create({
      //   data: {
      //     firstName: options.firstName,
      //     lastName: options.lastName,
      //     screenName: options.screenName,
      //     email: options.email,
      //     password: hashedPassword,
      //     location: {
      //       create: {
      //         lat: options.lat!,
      //         lon: options.lon!,
      //         locationType: LocationTypes.User,
      //         primaryCellLevel: 12,
      //         ...cellsLevels!,
      //       },
      //     },
      //   },
      // });
    } catch (err) {
      // duplicate username error
      return {};
      // if (err.code === DUPLICATE_ENTRY) {
      //   const errDetail: string = err.detail.toLowerCase();
      //   console.log(errDetail);
      //   return {
      //     errors: [
      //       errDetail.includes("key (email)")
      //         ? EmailExistsError
      //         : errDetail.includes("key (screen_name)")
      //         ? ScreenNameExistsError
      //         : GenericUserInsertError,
      //     ],
      //   };
      // }
    }

    // create JWT
    let refreshToken = createRefreshToken(user);
    sendRefreshToken(res, refreshToken);

    return {
      accessToken: createAccessToken(user),
      refreshToken: refreshToken,
    };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("options", () => UserLoginInput) options: UserLoginInput,
    @Ctx() { res, db, prisma }: AppContext
  ): Promise<LoginResponse> {
    const errors = convertValidationErrors(await validate(options));
    if (errors.length > 0) {
      return { errors };
    }

    // const user = await prisma.user.findUnique({
    //   where: { email: options.email },
    // });

    const [userDZL] = await db
      .select()
      .from(users)
      .where(eq(users.email, options.email));
    const user = userDZL as User;

    if (!user) {
      console.log("user doesn't exist");
      return {
        errors: [UserDoesNotExistError],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      console.log("creds are wrong");
      return {
        errors: [InvalidCredentialsError],
      };
    }

    console.log("success returning token");
    let refreshToken = createRefreshToken(user);
    sendRefreshToken(res, refreshToken);

    return {
      accessToken: createAccessToken(user),
      refreshToken,
    };
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { db, prisma, jwtPayload }: AppContext) {
    try {
      console.log("getting me");
      // return User.findOne(context.jwtPayload?.userID);
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, jwtPayload?.userID!));
      return user as User;
      // return await prisma.user.findUnique({
      //   where: { id: jwtPayload?.userID },
      // });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async logout(@Ctx() { db, prisma, jwtPayload }: AppContext) {
    // increment token version in DB by 1
    await db
      .update(users)
      .set({ tokenVersion: sql`tokenVersion + 1` })
      .where(eq(users.id, jwtPayload?.userID!));
    // await prisma.user.update({
    //   where: { id: jwtPayload?.userID },
    //   data: { tokenVersion: { increment: 1 } },
    // });

    return true;
  }

  // @Mutation(() => RefreshResponse)
  // @UseMiddleware(isRefresh)
  // async refreshToken(@Ctx() context: AppContext) {
  //   let user;
  //   try {
  //     user = await User.findOne(context.jwtPayload?.userID);
  //   } catch (err) {
  //     console.log(err);
  //     return {
  //       accessToken: "",
  //       errors: [{ message: "failed to create access token" }],
  //     };
  //   }

  //   return {
  //     accessToken: createAccessToken(user!),
  //   };
  // }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("options", () => UserUpdateInput) options: UserUpdateInput,
    @Ctx() { db, prisma }: AppContext
  ) {
    const errors = await validate(options);
    if (errors) {
      return { errors };
    }

    await db
      .update(users)
      .set({ ...options })
      .where(eq(users.id, id));
    // await prisma.user.update({ where: { id }, data: { ...options } });

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(
    @Arg("id", () => Int) id: number,
    @Ctx() { db, prisma }: AppContext
  ) {
    await db.delete(users).where(eq(users.id, id));
    // await prisma.user.delete({ where: { id } });
    return true;
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async users() {
    // return await User.find({ relations: ["posts"] });
  }

  @Query(() => User)
  @UseMiddleware(isAuth)
  async user(
    @Arg("id", () => Int) id: number,
    @Ctx() { db, prisma }: AppContext
  ): Promise<UserResponse> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return { user: user as User };
      // return { user: await prisma.user.findUniqueOrThrow({ where: { id } }) };
    } catch (err) {
      return { errors: [UserNotFound] };
    }
  }
}
