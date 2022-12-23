import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

/**
 * Check if the string is a valid password matches the following constraints:
 * 1 lowercase
 * 1 uppercase
 * 1 digit 0 - 9
 * 1 special character !@#$%^&*
 * must be between 8 - 50 characters
 */
export function IsPassword(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: PasswordConstraint,
        });
    };
}

@ValidatorConstraint({name: 'IsPassword'})
export class PasswordConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        // 1 lowercase
        // 1 uppercase
        // 1 digit 0 - 9
        // 1 special character !@#$%^&*
        // must be between 8 - 50 characters
        const passRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,50})');
        return passRegex.test(value as string);
    }

}