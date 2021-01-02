import argon2 from "argon2";
import { validate } from "class-validator";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../../auth/auth";
import { DUPLICATE_ENTRY } from "../../constants/ErrorCodes";
import { AppContext } from "../../context/AppContext";
import { User } from "../entities/User";
import {
  convertValidationErrors,
  EmailExistsError,
  GenericUserInsertError,
  InvalidCredentialsError,
  ScreenNameExistsError,
  UserDoesNotExistError,
  UserNotFound,
} from "../errors/FieldError";
import {
  UserCheckEmailScreenNameInputs,
  UserLoginInput,
  UserRegisterInput,
  UserUpdateInput,
} from "./inputs/UserInputs";
import { LoginResponse, UserResponse } from "./responses/UserResponses";

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

  @Mutation(() => UserResponse)
  async register(
    @Arg("options", () => UserRegisterInput) options: UserRegisterInput,
    @Ctx() { req, res }: AppContext
  ): Promise<UserResponse> {
    const errors = convertValidationErrors(await validate(options));
    if (errors.length > 0) {
      return { errors };
    }

    // hash password
    const hashedPassword = await argon2.hash(options.password);
    let user;

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
      await insertUserQuery.execute();
      user = await User.findOne({ email: options.email });
    } catch (err) {
      console.log(err);
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

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    // req.session.userId = user.id;
    return { user };
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

    const user = await User.findOne({ where: { email: options.email } });
    if (!user) {
      return {
        errors: [UserDoesNotExistError],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [InvalidCredentialsError],
      };
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
    };
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
