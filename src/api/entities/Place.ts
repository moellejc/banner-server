import { Field, Int, ObjectType } from "type-graphql";
import { PlaceTypes } from "@prisma/client";
import { Location } from "./Location";
import { Address } from "./Address";
import { Organization } from "./Organization";
import { UserLocationPath } from "./UserLocationPath";
import { UserVisitHistory } from "./UserVisitHistory";

@ObjectType()
export class Place {
  @Field()
  id: number;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  label: string;

  @Field(() => String, { nullable: false })
  language: string;

  @Field(() => PlaceTypes, { nullable: false })
  placeType: PlaceTypes;

  @Field(() => Int, { nullable: true })
  cellID?: number | null;

  @Field(() => Location, { nullable: true })
  cell?: Location | null;

  @Field(() => Int, { nullable: true })
  parentID?: number | null;

  @Field(() => Place, { nullable: true })
  parent?: Place | null;

  @Field(() => [Place], { nullable: true })
  children?: Place[] | null;

  @Field(() => Int, { nullable: true })
  addressID?: number | null;

  @Field(() => Address, { nullable: true })
  address?: Address | null;

  @Field(() => String, { nullable: true })
  references?: string | null;

  @Field(() => String, { nullable: true })
  categories?: string | null;

  @Field(() => String, { nullable: true })
  contacts?: string | null;

  @Field(() => String, { nullable: true })
  hours?: string | null;

  @Field(() => Int, { nullable: true })
  organizationID?: number | null;

  @Field(() => Organization, { nullable: true })
  organization?: Organization | null;

  @Field()
  peopleHere: number;

  @Field(() => [UserVisitHistory], { nullable: true })
  visitorHistory?: UserVisitHistory[] | null;

  @Field({ nullable: false })
  updatedAt: Date;

  @Field({ nullable: false })
  createdAt: Date;
}

export const hereMapsPlaceToBannerPlace = () => {};
export const hereMapsPlacesToBannerPlaces = () => {};
