import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { User } from "../entities/User";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@ValidatorConstraint({ async: true })
export class IsScreenNameAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  validate(screenName: string) {
    // return false if a screen name exists so validator fails
    return prisma.user.count({ where: { screenName } }).then((total) => {
      if (total) return false;
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
