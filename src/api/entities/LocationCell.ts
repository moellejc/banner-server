import { Field, Int, ObjectType, Float } from "type-graphql";
import { User } from "./User";
import { Post } from "./Post";
import { Place } from "./Place";

@ObjectType()
export class LocationCell {
  @Field(() => Int)
  id: number;

  @Field((type) => Float, { nullable: false })
  lat: number;

  @Field((type) => Float, { nullable: false })
  lon: number;

  @Field(() => String, { nullable: false })
  geoCellRes1: string;

  @Field(() => String, { nullable: false })
  geoCellRes2: string;

  @Field(() => String, { nullable: false })
  geoCellRes3: string;

  @Field(() => String, { nullable: false })
  geoCellRes4: string;

  @Field(() => String, { nullable: false })
  geoCellRes5: string;

  @Field(() => String, { nullable: false })
  geoCellRes6: string;

  @Field(() => String, { nullable: false })
  geoCellRes7: string;

  @Field(() => String, { nullable: false })
  geoCellRes8: string;

  @Field(() => String, { nullable: false })
  geoCellRes9: string;

  @Field(() => String, { nullable: false })
  geoCellRes10: string;

  @Field(() => String, { nullable: false })
  geoCellRes11: string;

  @Field(() => String, { nullable: false })
  geoCellRes12: string;

  @Field(() => String, { nullable: false })
  geoCellRes13: string;

  @Field(() => String, { nullable: false })
  geoCellRes14: string;

  @Field(() => String, { nullable: false })
  geoCellRes15: string;

  @Field(() => Date, { nullable: false })
  createdAt: Date;

  @Field(() => [User], { nullable: true })
  users?: User[] | null;

  @Field(() => [Post], { nullable: true })
  posts?: Post[] | null;

  @Field(() => [Place], { nullable: true })
  places?: Place[] | null;
}
