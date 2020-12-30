import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity({ name: "follows" })
export class Follow extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ name: "entity_followed_id", type: "uuid" })
  entityFollowedID: string;

  @Field(() => Int)
  @Column({ name: "entity_type", type: "smallint" })
  entityType: number;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
