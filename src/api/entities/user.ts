import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRoles } from "../enums/UserRoles";
import { UserStatuses } from "../enums/UserStatuses";
import { UserTypes } from "../enums/UserTypes";
import { Like } from "./Like";
import { Media } from "./Media";
import { Post } from "./Post";
import { LocationCell } from "./LocationCell";

@ObjectType()
@Entity({ name: "users" })
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field({ nullable: false })
  @Column({ name: "first_name" })
  firstName: string;

  @Field({ nullable: false })
  @Column({ name: "last_name" })
  lastName: string;

  @Field({ nullable: false })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: "temp_password", nullable: true })
  tempPassword: string;

  @Field({ nullable: true })
  @Column({ name: "temp_password_expires", nullable: true })
  tempPasswordExpires: Date;

  @Field({ defaultValue: false })
  @Column({ name: "has_temp_password", default: false })
  hasTempPassword: boolean;

  @Column({ type: "int", name: "token_version", default: 1 })
  tokenVersion: number;

  @Field({ nullable: false })
  @Column({ name: "screen_name", unique: true })
  screenName: string;

  @Field({ nullable: true })
  @Column({ name: "profile_pic", nullable: true })
  profilePic: string;

  @Field(() => UserRoles, { defaultValue: UserRoles.BASIC })
  @Column({
    type: "enum",
    enum: UserRoles,
    default: UserRoles.BASIC,
  })
  role: UserRoles;

  @Field(() => UserStatuses, { defaultValue: UserStatuses.ACTIVE })
  @Column({
    type: "enum",
    enum: UserStatuses,
    default: UserStatuses.ACTIVE,
  })
  status: UserStatuses;

  @Field(() => UserTypes, { defaultValue: UserTypes.STANDARD })
  @Column({
    name: "user_type",
    type: "enum",
    enum: UserTypes,
    default: UserTypes.STANDARD,
  })
  userType: UserTypes;

  @Field({ defaultValue: false })
  @Column({ default: false })
  verified: boolean;

  @Field(() => LocationCell)
  @OneToOne(() => LocationCell, (location: LocationCell) => location.id)
  @JoinColumn({ name: "location_cell" })
  locationCell: LocationCell;

  @Field(() => [Post])
  @OneToMany(() => Post, (post: Post) => post.creator)
  @JoinColumn()
  posts: Post[];

  @Field(() => [Media])
  @OneToMany(() => Media, (media: Media) => media.creator)
  media: Media[];

  @Field(() => Int, { defaultValue: 0 })
  @Column({ type: "int", name: "total_posts", default: 0 })
  totalPosts: number;

  @Field(() => [Like])
  @OneToMany(() => Like, (like: Like) => like.user)
  @JoinColumn()
  likes: Like[];

  @Field(() => Int, { defaultValue: 0 })
  @Column({ type: "int", name: "totalLikes", default: 0 })
  totalLikes: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column({ type: "int", name: "total_followers", default: 0 })
  totalFollowers: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column({ type: "int", name: "total_following", default: 0 })
  totalFollowing: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column({ type: "int", name: "total_following_places", default: 0 })
  totalFollowingPlaces: number;

  @Field()
  @UpdateDateColumn({ name: "last_active_at" })
  lastActiveAt: Date;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
