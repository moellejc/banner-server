import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "../../validators/IsEmailAlreadyExist";
import { IsPassword } from "../../validators/IsPassword";
import { IsScreenName } from "../../validators/IsScreenName";
import { IsScreenNameAlreadyExist } from "../../validators/IsScreenNameAlreadyExist";
import { Match } from "../../validators/Match";

@InputType()
export class UserRegisterInput {
  @Field()
  @IsNotEmpty({ message: "First name is not valid" })
  firstName!: string;

  @Field()
  @IsNotEmpty({ message: "Last name is not valid" })
  lastName!: string;

  @Field()
  @IsEmail({}, { message: "Email is not valid" })
  @IsEmailAlreadyExist({ message: "Email already exists" })
  email!: string;

  @Field()
  @IsScreenName({ message: "Screen name is not valid" })
  screenName!: string;

  @Field()
  @IsPassword({ message: "Password is too weak" })
  password!: string;

  @Field()
  @Match("password", { message: "Passwords do not match" })
  repassword!: string;

  @Field()
  lat?: number;

  @Field()
  lon?: number;
}

@InputType()
export class UserCheckEmailScreenNameInputs {
  @Field()
  @IsEmail({}, { message: "Email is not valid" })
  @IsEmailAlreadyExist({ message: "Email already exists" })
  email!: string;

  @Field()
  @IsScreenName({ message: "Screen name is not valid" })
  @IsScreenNameAlreadyExist({ message: "Screen name already exists" })
  screenName!: string;
}

@InputType()
export class UserLoginInput {
  @Field()
  @IsEmail({}, { message: "Email is not valid" })
  email!: string;

  @Field()
  @MinLength(1, { message: "Password is not valid" })
  password!: string;
}

@InputType()
export class UserForgotPasswordInput {
  @Field()
  @IsEmail({}, { message: "Email is not valid" })
  email!: string;
}

@InputType()
export class UserUpdateInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  firstName?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  lastName?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;
}
