import { registerEnumType } from "type-graphql";
export enum UserStatuses {
  INVITED = "invited",
  ACTIVE = "active",
  INACTIVE = "inactive",
  ARCHIVE = "archive",
  DEACTIVATED = "deactivated",
}

export const registerUserStatuses = () => {
  registerEnumType(UserStatuses, {
    name: "UserStatuses",
    description: "List of user statuses",
  });
};
