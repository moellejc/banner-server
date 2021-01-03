import { Point } from "geojson";
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
import { PointScalar } from "../../types/Point";
import { Like } from "./Like";
import { Media } from "./Media";
import { PostReply } from "./PostReply";
import { User } from "./User";

@ObjectType()
@Entity({ name: "posts" })
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ name: "creator_id" })
  creatorID!: string;

  @Field(() => User)
  @ManyToOne(() => User, (author: User) => author.posts)
  creator!: User;

  // @Field()
  // @ManyToMany(() => Place, (place: Place) => place.posts)
  // placeID: Place;

  @Field(() => PointScalar)
  @Column("geometry", {
    spatialFeatureType: "Point",
    srid: 4326,
  })
  coordinates: Point;

  @Field({ nullable: true })
  @Column({ nullable: true })
  text: string;

  @Field(() => [Media])
  @OneToMany(() => Media, (media: Media) => media.post)
  media: [Media];

  @Field(() => [PostReply])
  @OneToMany(() => PostReply, (reply: PostReply) => reply.post)
  replies: [PostReply];

  @Field(() => Int, { defaultValue: 0 })
  @Column("int", { default: 0 })
  replyCount: number;

  @Field(() => [Like])
  @OneToMany(() => Like, (like: Like) => like.post)
  @JoinColumn()
  likes: [Like];

  @Field(() => Int, { defaultValue: 0 })
  @Column("int", { default: 0 })
  likeCount: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
