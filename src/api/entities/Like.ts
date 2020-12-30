import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
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
  @ManyToOne(() => User, (user: User) => user.likes)
  @Index("user-idx")
  user: User;

  @Field()
  @ManyToOne(() => Post, (post: Post) => post.likes)
  @Index("post-idx")
  post: Post;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
