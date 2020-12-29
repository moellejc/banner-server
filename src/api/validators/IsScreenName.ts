import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

/**
 * Check if the string is a valid screen name matching the following constraints:
 * has characters, digits, underscores, and dashes
 * must be between 4 - 50 characters
 */
export function IsScreenName(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ScreenNameConstraint,
    });
  };
}

@ValidatorConstraint({ name: "IsScreenName" })
export class ScreenNameConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    // has characters, digits, underscores, and dashes
    // must be between 4 - 50 characters
    const passRegex = new RegExp("^(?=[A-Za-z0-9_-]*$)(?=.{4,50})");
    return passRegex.test(value as string);
  }
}
