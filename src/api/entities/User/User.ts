import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Like } from "../Like";
import { Media } from "../Media";
import { Post } from "../Post";
import { Location } from "../Location";
import { UserLocationPath } from "./UserLocationPath";
import { UserVisitHistory } from "./UserVisitHistory";
import { UserRoles, UserStatuses, UserVerifications } from "../../enums";

registerEnumType(UserRoles, {
  name: "UserRoles",
  description: undefined,
});

registerEnumType(UserStatuses, {
  name: "UserStatuses",
  description: undefined,
});

registerEnumType(UserVerifications, {
  name: "UserVerifications",
  description: undefined,
});

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => String, { nullable: false })
  email: string;

  password: string;

  tempPassword?: string | null;

  @Field(() => Date, { nullable: true })
  tempPasswordExpires?: Date | null;

  @Field({ defaultValue: false })
  hasTempPassword: boolean;

  tokenVersion: number;

  @Field(() => String, { nullable: false })
  screenName: string;

  @Field(() => String, { nullable: true })
  profilePic?: string | null;

  @Field(() => UserRoles, { defaultValue: UserRoles.User })
  role: UserRoles;

  @Field(() => UserStatuses, { defaultValue: UserStatuses.Active })
  status: UserStatuses;

  @Field(() => UserVerifications, { defaultValue: UserVerifications.Standard })
  verificationType: UserVerifications;

  @Field({ defaultValue: false })
  isVerified: boolean;

  @Field(() => Int, { nullable: true })
  locationID?: number | null;

  @Field(() => Location, { nullable: true })
  location?: Location | null;

  @Field(() => [Post], { nullable: true })
  posts?: Post[] | null;

  @Field(() => [Media], { nullable: true })
  media?: Media[] | null;

  @Field(() => Int, { defaultValue: 0 })
  totalPosts: number;

  @Field(() => [Like], { nullable: true })
  likes?: Like[] | null;

  @Field(() => Int, { defaultValue: 0 })
  totalLikes: number;

  @Field(() => Int, { defaultValue: 0 })
  totalFollowers: number;

  @Field(() => Int, { defaultValue: 0 })
  totalFollowing: number;

  @Field(() => Int, { defaultValue: 0 })
  totalFollowingPlaces: number;

  @Field(() => [UserLocationPath], { nullable: true })
  locationPath?: UserLocationPath[] | null;

  @Field(() => [UserVisitHistory], { nullable: true })
  visitHistory?: UserVisitHistory[] | null;

  @Field(() => Date)
  lastActiveAt: Date;

  @Field(() => Date)
  createdAt: Date;
}
