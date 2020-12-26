import {
  Query,
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Int,
} from "type-graphql";
import { User } from "../entities/user";

@InputType()
class UserInput {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;
}

@InputType()
class UserUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  email?: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("options", () => UserInput) options: UserInput) {
    const user = await User.create(options).save();
    return user;
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("options", () => UserUpdateInput) options: UserUpdateInput
  ) {
    await User.update({ id }, options);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number) {
    await User.delete({ id });
    return true;
  }

  @Query(() => [User])
  async users() {
    return await User.find();
  }

  @Query(() => User)
  async user(@Arg("id", () => Int) id: number) {
    return await User.findOneOrFail({ id });
  }
}
