import { Field, Int, ObjectType } from "type-graphql";
import { UserRoles } from "../enums/UserRoles";
import { UserStatuses } from "../enums/UserStatuses";
import { UserTypes } from "../enums/UserTypes";
import { Like } from "./Like";
import { Media } from "./Media";
import { Post } from "./Post";
import { LocationCell } from "./LocationCell";

@ObjectType()
export class User {
  @Field()
  id!: string;

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  email: string;

  password: string;

  tempPassword: string;

  @Field({ nullable: true })
  tempPasswordExpires: Date;

  @Field({ defaultValue: false })
  hasTempPassword: boolean;

  tokenVersion: number;

  @Field({ nullable: false })
  screenName: string;

  @Field({ nullable: true })
  profilePic: string;

  @Field(() => UserRoles, { defaultValue: UserRoles.BASIC })
  role: UserRoles;

  @Field(() => UserStatuses, { defaultValue: UserStatuses.ACTIVE })
  status: UserStatuses;

  @Field(() => UserTypes, { defaultValue: UserTypes.STANDARD })
  userType: UserTypes;

  @Field({ defaultValue: false })
  verified: boolean;

  @Field(() => LocationCell)
  locationCell: LocationCell;

  @Field(() => [Post])
  posts: Post[];

  @Field(() => [Media])
  media: Media[];

  @Field(() => Int, { defaultValue: 0 })
  totalPosts: number;

  @Field(() => [Like])
  likes: Like[];

  @Field(() => Int, { defaultValue: 0 })
  totalLikes: number;

  @Field(() => Int, { defaultValue: 0 })
  totalFollowers: number;

  @Field(() => Int, { defaultValue: 0 })
  totalFollowing: number;

  @Field(() => Int, { defaultValue: 0 })
  totalFollowingPlaces: number;

  @Field()
  lastActiveAt: Date;

  @Field()
  createdAt: Date;
}
