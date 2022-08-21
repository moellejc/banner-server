import { Field, Int, Float } from "type-graphql";

export class LocationCell {
  @Field()
  id: number;

  @Field((type) => Float, { nullable: false })
  lat: number;

  @Field((type) => Float, { nullable: false })
  lon: number;

  @Field({ nullable: false })
  geoCellRes1: string;

  @Field({ nullable: false })
  geoCellRes2: string;

  @Field({ nullable: false })
  geoCellRes3: string;

  @Field({ nullable: false })
  geoCellRes4: string;

  @Field({ nullable: false })
  geoCellRes5: string;

  @Field({ nullable: false })
  geoCellRes6: string;

  @Field({ nullable: false })
  geoCellRes7: string;

  @Field({ nullable: false })
  geoCellRes8: string;

  @Field({ nullable: false })
  geoCellRes9: string;

  @Field({ nullable: false })
  geoCellRes10: string;

  @Field({ nullable: false })
  geoCellRes11: string;

  @Field({ nullable: false })
  geoCellRes12: string;

  @Field({ nullable: false })
  geoCellRes13: string;

  @Field({ nullable: false })
  geoCellRes14: string;

  @Field({ nullable: false })
  geoCellRes15: string;

  @Field({ nullable: false })
  createdAt: Date;
}
