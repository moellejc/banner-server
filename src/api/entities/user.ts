import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRoles } from "../enums/UserRoles";
import { UserStatuses } from "../enums/UserStatuses";
import { UserTypes } from "../enums/UserTypes";
import { Like } from "./Like";
import { Post } from "./Post";

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

  @OneToMany(() => Post, (post: Post) => post.author)
  @JoinColumn()
  posts: Post[];

  @Field(() => Int, { defaultValue: 0 })
  @Column({ name: "total_posts", default: 0 })
  totalPosts: number;

  @OneToMany(() => Like, (like: Like) => like.user)
  @JoinColumn()
  likes: Like[];

  @Field(() => Int, { defaultValue: 0 })
  @Column({ name: "totalLikes", default: 0 })
  totalLikes: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column({ name: "total_followers", default: 0 })
  totalFollowers: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column({ name: "total_following", default: 0 })
  totalFollowing: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column({ name: "total_following_places", default: 0 })
  totalFollowingPlaces: number;

  @Field()
  @UpdateDateColumn({ name: "last_active_at" })
  lastActiveAt: Date;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
