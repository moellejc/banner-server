import { Field, Int, Float } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Index(
  [
    "geocell_res_1",
    "geocell_res_2",
    "geocell_res_3",
    "geocell_res_4",
    "geocell_res_5",
    "geocell_res_6",
    "geocell_res_7",
    "geocell_res_8",
    "geocell_res_9",
    "geocell_res_10",
    "geocell_res_11",
    "geocell_res_12",
    "geocell_res_13",
    "geocell_res_14",
    "geocell_res_15",
  ],
  { unique: true }
)
export class LocationCell extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("identity", {
    generatedIdentity: "BY DEFAULT",
    type: "int",
  })
  readonly id!: number;

  @Field((type) => Float, { nullable: false })
  @Column({ type: "float", nullable: false })
  lat: number;

  @Field((type) => Float, { nullable: false })
  @Column({ type: "float", nullable: false })
  lon: number;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_1", nullable: false })
  @Index()
  geoCellRes1: string;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_2", nullable: false })
  @Index()
  geoCellRes2: string;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_3", nullable: false })
  @Index()
  geoCellRes3: string;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_4", nullable: false })
  @Index()
  geoCellRes4: string;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_5", nullable: false })
  @Index()
  geoCellRes5: string;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_6", nullable: false })
  @Index()
  geoCellRes6: string;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_7", nullable: false })
  @Index()
  geoCellRes7: string;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_8", nullable: false })
  @Index()
  geoCellRes8: string;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_9", nullable: false })
  @Index()
  geoCellRes9: string;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_10", nullable: false })
  @Index()
  geoCellRes10: string;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_11", nullable: false })
  @Index()
  geoCellRes11: string;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_12", nullable: false })
  @Index()
  geoCellRes12: string;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_13", nullable: false })
  @Index()
  geoCellRes13: string;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_14", nullable: false })
  @Index()
  geoCellRes14: string;

  @Field({ nullable: false })
  @Column({ type: "string", name: "geocell_res_15", nullable: false })
  @Index()
  geoCellRes15: string;

  @Field({ nullable: false })
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
