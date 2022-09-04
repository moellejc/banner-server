import { validate } from "class-validator";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  Int,
} from "type-graphql";
import { getConnection, InsertResult, MoreThan } from "typeorm";
import { AppContext } from "../../context/AppContext";
import { logger } from "../../lib/logger/Logger";
import { isAuth } from "../../middlewares/isAuth";
import { Media } from "../entities/Media";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { convertValidationErrors } from "../errors/FieldError";
import {
  PostAuthorNotFound,
  PostMediaNotInserted,
  PostNotCreated,
  TotalPostsNotIncremented,
} from "../errors/PostErrors";
import { PostCreateInput } from "./inputs/PostInputs";
import { PostResponse } from "./responses/PostResponses";
import { Post as PostPris, prisma } from "@prisma/client";
import { Prisma } from "@prisma/client";

@Resolver()
export class PostResolver {
  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("options", () => PostCreateInput) options: PostCreateInput,
    @Ctx() { prisma, jwtPayload }: AppContext
  ): Promise<PostResponse> {
    // validate inputs
    const errors = convertValidationErrors(await validate(options));
    if (errors.length > 0) {
      logger.error(errors);
      return { errors };
    }

    const creator = await prisma.user.findUniqueOrThrow({
      where: { id: jwtPayload?.userID },
    });

    // TODO: get location cell based on coordinates

    // insert post
    // TODO: link media to post
    // TODO: link place to post
    const post = await prisma.post.create({
      data: {
        authorID: creator.id,
        cellID: 111,
        text: options.text,
      },
      include: {
        author: true,
      },
    });

    // insert media
    // try {
    //   if (options.media) {
    //     options.media?.forEach(async (value: Media) => {
    //       let m = await value.save();
    //       post.media.push(m);
    //     });
    //   }
    // } catch (err) {
    //   return { errors: [PostMediaNotInserted] };
    // }

    // increment post total on users
    // try {
    //   await getConnection()
    //     .getRepository(User)
    //     .increment({ id: creator!.id }, "totalPosts", 1);
    // } catch (err) {
    //   logger.error(err);
    //   return { errors: [TotalPostsNotIncremented] };
    // }

    return { post };
  }

  @Query(() => [Post])
  @UseMiddleware(isAuth)
  async myPosts(@Ctx() { prisma, jwtPayload }: AppContext) {
    return await prisma.post.findMany({
      where: { authorID: jwtPayload?.userID },
    });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { prisma, jwtPayload }: AppContext
  ) {
    try {
      // delete post (assuming there is only one post deleted...)
      const deletedPost = await prisma.post.delete({ where: { id: id } });

      // decrement total posts from the user
      await prisma.user.update({
        where: { id: deletedPost.authorID },
        data: { totalPosts: { decrement: 1 } },
      });
    } catch (err) {
      logger.error(err);
      return false;
    }

    return true;
  }
}
