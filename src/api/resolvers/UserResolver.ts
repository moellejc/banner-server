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
import { getConnection } from "typeorm";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../../auth/auth";
import { DUPLICATE_ENTRY } from "../../constants/ErrorCodes";
import { AppContext } from "../../context/AppContext";
import { isAuth } from "../../middlewares/isAuth";
import { User } from "../entities/User";
import { convertValidationErrors } from "../errors/FieldError";
import {
  EmailExistsError,
  GenericUserInsertError,
  InvalidCredentialsError,
  ScreenNameExistsError,
  UserDoesNotExistError,
  UserNotFound,
} from "../errors/UserErrors";
import {
  UserCheckEmailScreenNameInputs,
  UserLoginInput,
  UserRegisterInput,
  UserUpdateInput,
} from "./inputs/UserInputs";
import {
  LoginResponse,
  RegisterResponse,
  UserResponse,
} from "./responses/UserResponses";

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
    @Ctx() { req, res }: AppContext
  ): Promise<RegisterResponse> {
    const errors = convertValidationErrors(await validate(options));
    if (errors.length > 0) {
      return { errors };
    }

    // hash password
    const hashedPassword = await argon2.hash(options.password);
    let user: User = new User();

    try {
      const insertUserQuery = getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          firstName: options.firstName,
          lastName: options.lastName,
          screenName: options.screenName,
          email: options.email,
          password: hashedPassword,
        })
        .returning("*");
      let userRes = await insertUserQuery.execute();
      user = userRes.generatedMaps[0] as User;
    } catch (err) {
      // duplicate username error
      if (err.code === DUPLICATE_ENTRY) {
        const errDetail: string = err.detail.toLowerCase();
        console.log(errDetail);
        return {
          errors: [
            errDetail.includes("key (email)")
              ? EmailExistsError
              : errDetail.includes("key (screen_name)")
              ? ScreenNameExistsError
              : GenericUserInsertError,
          ],
        };
      }
    }

    // create JWT
    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user: user,
    };

    // return { user };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("options", () => UserLoginInput) options: UserLoginInput,
    @Ctx() { req, res }: AppContext
  ): Promise<LoginResponse> {
    const errors = convertValidationErrors(await validate(options));
    if (errors.length > 0) {
      return { errors };
    }
    console.log("find logged in user");
    const user = await User.findOne({ where: { email: options.email } });
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
    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
    };
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  me(@Ctx() context: AppContext) {
    try {
      console.log("getting me");
      return User.findOne(context.jwtPayload?.userID);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: AppContext) {
    sendRefreshToken(res, "");

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(
    @Arg("userId", () => String) userId: string
  ) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Arg("id", () => String) id: string,
    @Arg("options", () => UserUpdateInput) options: UserUpdateInput
  ) {
    const errors = validate(options);
    if (errors) {
      return { errors };
    }

    await User.update({ id }, options);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => String) id: string) {
    await User.delete({ id });
    return true;
  }

  @Query(() => [User])
  async users() {
    return await User.find({ relations: ["posts"] });
  }

  @Query(() => User)
  async user(@Arg("id", () => Int) id: string): Promise<UserResponse> {
    try {
      return { user: await User.findOneOrFail({ id }) };
    } catch (err) {
      return { errors: [UserNotFound] };
    }
  }
}
