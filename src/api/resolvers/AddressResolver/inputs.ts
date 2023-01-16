import { Field, InputType } from "type-graphql";

@InputType()
export class AddressInput {
  @Field()
  countryCode: string;

  @Field()
  countryName: string;

  @Field(() => String)
  stateCode: string;

  @Field(() => String)
  state: string;

  @Field(() => String, { nullable: true })
  county?: string | null;

  @Field(() => String)
  city: string;

  @Field(() => String, { nullable: true })
  district?: string | null;

  @Field(() => String)
  street: string;

  @Field(() => String)
  houseNumber: string;

  @Field(() => String)
  postalCode: string;
}
