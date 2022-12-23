import { ValidationError } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field({ nullable: true })
  field?: string;

  @Field({ nullable: true })
  message?: string;

  @Field(() => [String], { nullable: true })
  constraints?: string[];
}

// error functions
export const convertValidationErrors = (
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
