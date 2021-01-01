import { registerEnumType } from "type-graphql";
export enum UserTypes {
  STANDARD = "standard",
  CELEBRITY = "celebrity",
  GOVERNMENT_OFFICIAL = "government official",
}

export const registerUserTypes = () => {
  registerEnumType(UserTypes, {
    name: "UserTypes",
    description: "List of user types",
  });
};
