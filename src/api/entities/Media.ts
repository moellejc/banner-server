import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MediaTypes } from "../enums/MediaTypes";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class Media extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ name: "creator_id" })
  @Index("media-creator-idx")
  creatorID: string;

  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.media)
  creator: User;

  @Field()
  @Column({ name: "post_id" })
  @Index("media-post-idx")
  postID: string;

  @Field(() => Post)
  @ManyToOne(() => Post, (post: Post) => post.media)
  post: Post;

  @Field(() => MediaTypes)
  @Column({
    type: "enum",
    enum: MediaTypes,
    name: "media_type",
  })
  mediaType!: MediaTypes;

  @Field()
  @Column({ name: "media_url" })
  mediaURL: string;

  @Field(() => Int, { defaultValue: 0 })
  @Column({ type: "int", name: "media_index", default: 0 })
  mediaIndex: number;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
