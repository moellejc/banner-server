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
import { AppContext } from "../../../context/AppContext";
import { logger } from "../../../lib/logger/Logger";
import { isAuth } from "../../../middlewares/isAuth";
import { Media } from "../../entities/Media";
import { Post } from "../../entities/Post";
import { posts } from "../../entities/Schema";
import { User } from "../../entities/User";
import { users } from "../../entities/Schema";
import { convertValidationErrors } from "../../errors/FieldError";
import {
  PostAuthorNotFound,
  PostMediaNotInserted,
  PostNotCreated,
  TotalPostsNotIncremented,
} from "../../errors/PostErrors";
import { PostCreateInput } from "./inputs";
import { PostResponse } from "./responses";
import { eq, sql } from "drizzle-orm";

@Resolver()
export class PostResolver {
  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("options", () => PostCreateInput) options: PostCreateInput,
    @Ctx() { db, jwtPayload }: AppContext
  ): Promise<PostResponse> {
    // validate inputs
    const errors = convertValidationErrors(await validate(options));
    if (errors.length > 0) {
      logger.error(errors);
      return { errors };
    }

    const [creatorDZL] = await db
      .select()
      .from(users)
      .where(eq(users.id, jwtPayload?.userID!));
    const creator = creatorDZL as User;

    // TODO: get location cell based on coordinates

    // insert post
    // TODO: link media to post
    // TODO: link place to post

    const [{ id }] = await db
      .insert(posts)
      .values({
        authorID: creator.id,
        locationID: 111,
        text: options.text,
      })
      .returning({ id: posts.id });

    const postWithAuthorDZL = await db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
      with: { author: true },
    });

    return { post: postWithAuthorDZL as Post };
  }

  @Query(() => [Post])
  @UseMiddleware(isAuth)
  async myPosts(@Ctx() { db, jwtPayload }: AppContext) {
    const posts = await db.query.posts.findMany({
      where: (posts, { eq }) => eq(posts.authorID, jwtPayload?.userID!),
    });

    return posts;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { db, jwtPayload }: AppContext
  ) {
    try {
      // delete post (assuming there is only one post deleted...)
      const [deletedPost] = await db
        .delete(posts)
        .where(eq(posts.id, id))
        .returning();

      // decrement total posts from the user
      await db
        .update(users)
        .set({
          totalPosts: sql`${users.totalPosts} - 1`,
        })
        .where(eq(users.id, deletedPost.authorID!));
    } catch (err) {
      logger.error(err);
      return false;
    }

    return true;
  }
}
