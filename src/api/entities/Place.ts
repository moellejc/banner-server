import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { LocationCell } from "./LocationCell";

export class Place extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("identity", {
    generatedIdentity: "BY DEFAULT",
    type: "int",
  })
  readonly id!: number;

  @Field({ nullable: false })
  @Column()
  name: string;

  @Field(() => LocationCell)
  @OneToOne(() => LocationCell, (location: LocationCell) => location.id)
  @JoinColumn({ name: "location_cell" })
  locationCell: LocationCell;

  @Field()
  @Column({ name: "street_num" })
  streetNum: string;

  @Field()
  @Column()
  street: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column({ name: "state_code" })
  stateCode: string;

  @Field()
  @Column({ name: "postal_code" })
  postalCode: string;

  @Field()
  @Column()
  county: string;

  @Field()
  @Column({ name: "country_name" })
  countryName: string;

  @Field()
  @Column({ name: "country_code" })
  countryCode: string;

  @Field()
  @Column({ name: "people_here", type: "int" })
  peopleHere: number;

  @Field({ nullable: false })
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
