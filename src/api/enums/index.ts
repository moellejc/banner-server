import { registerGroupRoles } from "./GroupRoles";
import { registerUserRoles } from "./UserRoles";
import { registerUserStatuses } from "./UserStatuses";
import { registerUserTypes } from "./UserTypes";

export const registerAllEnums = () => {
  registerGroupRoles();
  registerUserRoles();
  registerUserStatuses();
  registerUserTypes();
};
