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
@Entity({ name: "media" })
export class Media extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ name: "creator_id" })
  @Index("creator-idx")
  creatorID: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.media)
  creator: User;

  @Field()
  @Column({ name: "post_id" })
  @Index("post-idx")
  postID: string;

  @Field(() => Post)
  @ManyToOne(() => Post, (post: Post) => post.media)
  post: Post;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
