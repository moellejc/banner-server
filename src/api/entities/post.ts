import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Like } from "./Like";
import { User } from "./User";

@ObjectType()
@Entity({ name: "posts" })
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @ManyToOne(() => User, (author: User) => author.posts)
  author: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  message: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  photo_url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  video_url: string;

  // TODO: replies

  @Field(() => Int, { defaultValue: 0 })
  @Column("int", { default: 0 })
  replyCount: number;

  @OneToMany(() => Like, (like: Like) => like.postID)
  @JoinColumn()
  likes: Like;

  @Field(() => Int, { defaultValue: 0 })
  @Column("int", { default: 0 })
  likeCount: number;

  @Field()
  @CreateDateColumn()
  created_at: Date;
}
