import { registerEntityTypes } from "./EntityTypes";
import { registerGroupRoles } from "./GroupRoles";
import { registerMediaTypes } from "./MediaTypes";
import { registerUserRoles } from "./UserRoles";
import { registerUserStatuses } from "./UserStatuses";
import { registerUserTypes } from "./UserTypes";

export const registerAllEnums = () => {
  registerGroupRoles();
  registerUserRoles();
  registerUserStatuses();
  registerUserTypes();
  registerMediaTypes();
  registerEntityTypes();
};
