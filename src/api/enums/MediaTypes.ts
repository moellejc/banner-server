import { registerEnumType } from "type-graphql";

export enum MediaTypes {
  PHOTO = "photo",
  VIDEO = "video",
}

export const registerMediaTypes = () => {
  registerEnumType(MediaTypes, {
    name: "MediaTypes",
    description: "List of media types",
  });
};
