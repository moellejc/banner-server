import { registerEnumType } from "type-graphql";

export enum EntityTypes {
  USER = "user",
  PLACE = "place",
  POST = "post",
  ORGANIZATION = "organization",
  GROUP = "group",
}

export const registerEntityTypes = () => {
  registerEnumType(EntityTypes, {
    name: "EntityTypes",
    description: "List of entity types",
  });
};
