import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { users } from "../entities/Schema";
import { dzlClient } from "../../lib/drizzle";
import { eq, sql, count } from "drizzle-orm";

@ValidatorConstraint({ async: true })
export class IsScreenNameAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  validate(screenName: string) {
    // return false if a screen name exists so validator fails
    return dzlClient
      .select({ count: count() })
      .from(users)
      .where(eq(users.screenName, screenName))
      .then((res) => {
        const total = res[0].count;
        if (total > 0) return false;
        return true;
      });
  }
}

export function IsScreenNameAlreadyExist(
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsScreenNameAlreadyExist,
    });
  };
}
