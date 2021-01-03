import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity({ name: "likes" })
export class Like extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ name: "user_id" })
  @Index("likes-userid-idx")
  userID: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.likes)
  user: User;

  @Field()
  @Column({ name: "post_id" })
  @Index("likes-post-idx")
  postID: string;

  @Field(() => Post)
  @ManyToOne(() => Post, (post: Post) => post.likes)
  post: Post;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
