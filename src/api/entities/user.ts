import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
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

  @Field({ nullable: false })
  @Column({ name: "screen_name", unique: true })
  screenName: string;

  @Field({ nullable: true })
  @Column({ name: "profile_pic", nullable: true })
  profilePic: string;

  @Field(() => Int, { defaultValue: 1 })
  @Column({ type: "smallint", default: 1 })
  role: number;

  @Field(() => Int, { defaultValue: 1 })
  @Column({ type: "smallint", default: 1 })
  status: number;

  @Field(() => Int, { defaultValue: 1 })
  @Column({ name: "user_type", type: "smallint", default: 1 })
  userType: number;

  @Field({ defaultValue: false })
  @Column({ default: false })
  verified: boolean;

  @Field(() => Int, { defaultValue: 0 })
  @Column({ name: "total_pos", default: 0 })
  totalPos: number;

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
