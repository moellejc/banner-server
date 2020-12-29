import { ValidationError } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field({ nullable: true })
  message?: string;

  @Field(() => [String], { nullable: true })
  constraints?: string[];
}

// error functions
let convertValidationErrors = (
  validationErrors: ValidationError[]
): FieldError[] => {
  let convertedErrors: FieldError[] = [];
  validationErrors.forEach((val: ValidationError) => {
    console.log(val);
    convertedErrors.push({
      field: val.property,
      message: "",
      constraints: val.constraints
        ? Object.keys(val.constraints!).map((key) => {
            return val.constraints![key];
          })
        : [],
    });
  });
  return convertedErrors;
};

// predefied errors
const GenericUserInsertError = {
  field: "",
  message: "There was an issue inserting a new user",
};

const ScreenNameExistsError = {
  field: "screen_name",
  message: "Screen name already exists",
};

const EmailExistsError = {
  field: "email",
  message: "Email already exists",
};

const UserDoesNotExistError = {
  field: "email",
  message: "User email does not exist",
};

const InvalidCredentialsError = {
  field: "password",
  message: "Invalid email or password",
};

export {
  convertValidationErrors,
  GenericUserInsertError,
  ScreenNameExistsError,
  EmailExistsError,
  UserDoesNotExistError,
  InvalidCredentialsError,
};
