import { Min } from "class-validator";
import { ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  text: string;

  @Column()
  author_id: number;

  @Column("int", { default: 0 })
  @Min(0)
  reply_count: number;

  @CreateDateColumn()
  created_at: Date;
}
