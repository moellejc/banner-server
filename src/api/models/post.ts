import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Min } from "class-validator";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  text: string;

  @Column()
  author_id: number;

  @Column("int", { default: 0 })
  @Min(0)
  reply_count: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
