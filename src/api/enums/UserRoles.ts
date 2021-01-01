import { registerEnumType } from "type-graphql";
export enum UserRoles {
  GOD = "god",
  ADMIN = "admin",
  BASIC = "basic",
}

export const registerUserRoles = () => {
  registerEnumType(UserRoles, {
    name: "UserRoles",
    description: "List of user roles",
  });
};
