import { registerEnumType } from "type-graphql";
export enum GroupRoles {
  CREATOR = "creator",
  OWNER = "owner",
  MANAGER = "manager",
  MEMBER = "member",
}

export const registerGroupRoles = () => {
  registerEnumType(GroupRoles, {
    name: "GroupRoles",
    description: "List of group roles",
  });
};
