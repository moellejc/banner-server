import { Field, Float, InputType } from "type-graphql";
@InputType()
export class PostCreateInput {
  @Field()
  authorID!: string;

  @Field()
  message?: string;

  @Field()
  media?: string;

  @Field()
  placeID?: String;

  @Field(() => Float)
  longitude: number;

  @Field(() => Float)
  latitude: number;
}
