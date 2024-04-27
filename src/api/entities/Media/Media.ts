import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Post } from "../Post";
import { User } from "../User";

export enum MediaTypes {
  Audio = "AUDIO",
  Model = "MODEL",
  Photo = "PHOTO",
  Video = "VIDEO",
}

export enum MediaExtensions {
  PNG = "PNG",
  JPG = "JPG",
  JPEG = "JPEG",
  BMP = "BMP",
  MP4 = "MP4",
  AVI = "AVI",
  FBX = "FBX",
  USDZ = "USDZ",
  GLTF = "GLTF",
}

registerEnumType(MediaTypes, {
  name: "MediaTypes",
  description: undefined,
});

registerEnumType(MediaExtensions, {
  name: "MediaExtensions",
  description: undefined,
});

@ObjectType()
export class Media {
  @Field()
  id!: string;

  @Field()
  creatorID: string;

  @Field(() => User)
  creator: User;

  @Field()
  postID: string;

  @Field(() => Post)
  post: Post;

  @Field(() => MediaTypes)
  mediaType!: MediaTypes;

  @Field()
  mediaURL: string;

  @Field(() => Int, { defaultValue: 0 })
  mediaIndex: number;

  @Field()
  createdAt: Date;
}
