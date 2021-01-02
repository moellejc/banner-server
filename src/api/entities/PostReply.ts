import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity({ name: "post_replies" })
export class PostReply extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ name: "creator_id" })
  @Index("creator-idx")
  creatorID: string;

  @Field(() => User)
  @ManyToOne(() => User, (author: User) => author.posts)
  creator!: User;

  @Field()
  @Column({ name: "post_id" })
  @Index("post-idx")
  postID: string;

  @Field(() => Post)
  @ManyToOne(() => Post, (post: Post) => post.replies)
  post!: Post;

  @Field({ nullable: true })
  @Column({ name: "parent_reply_id", nullable: true })
  parentReplyId?: string;

  @Field(() => PostReply)
  @ManyToOne(() => PostReply, (reply: PostReply) => reply.replies)
  parentReply?: PostReply;

  @Field(() => [PostReply])
  @OneToMany(() => PostReply, (reply: PostReply) => reply.parentReply)
  replies?: PostReply[];

  @Field(() => Int, { defaultValue: 0 })
  @Column({ type: "int", name: "total_replies", default: 0 })
  totalReplies: number;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
