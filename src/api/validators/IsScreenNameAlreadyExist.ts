import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { User } from "../entities/User";

@ValidatorConstraint({ async: true })
export class IsScreenNameAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  validate(screenName: string) {
    return User.findOne({ where: { screenName } }).then((user) => {
      if (user) return false;
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
