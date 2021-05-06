import { Field, ObjectType } from "type-graphql";
import { User } from "../../entities/User";
import { FieldError } from "../../errors/FieldError";

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class RegisterResponse {
  @Field()
  accessToken?: string;

  @Field()
  refreshToken?: string;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken?: string;

  @Field()
  refreshToken?: string;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class RefreshResponse {
  @Field()
  accessToken?: string;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
