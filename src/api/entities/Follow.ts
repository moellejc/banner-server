import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Follow {
  @Field()
  id!: string;

  @Field()
  entityFollowedID: string;

  @Field(() => Int)
  entityType: number;

  @Field()
  createdAt: Date;
}
