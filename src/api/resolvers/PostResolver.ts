import { validate } from "class-validator";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
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

@Resolver()
export class PostResolver {
  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("options", () => PostCreateInput) options: PostCreateInput,
    @Ctx() context: AppContext
  ): Promise<PostResponse> {
    const errors = convertValidationErrors(await validate(options));
    if (errors.length > 0) {
      logger.error(errors);
      return { errors };
    }

    let creator: User = new User();

    // find author
    try {
      creator =
        (await User.findOne({ id: context.jwtPayload?.userID })) || new User();

      if (!creator.id) {
        return { errors: [PostAuthorNotFound] };
      }
    } catch (err) {
      logger.error(err);
      return { errors: [PostAuthorNotFound] };
    }

    let post: Post;

    // insert post
    try {
      const insertPostQuery = getConnection()
        .createQueryBuilder()
        .insert()
        .into(Post)
        .values({
          creatorID: context.jwtPayload?.userID,
          creator: creator,
          text: options.text,
          coordinates: options.coordinates,
        })
        .returning("*")
        .execute();
      const postRes: InsertResult = await insertPostQuery;
      post = postRes.generatedMaps[0] as Post;
      console.log(post);
    } catch (err) {
      logger.error(err);
      return { errors: [PostNotCreated] };
    }

    // insert media
    try {
      if (options.media) {
        options.media?.forEach(async (value: Media) => {
          let m = await value.save();
          post.media.push(m);
        });
      }
    } catch (err) {
      return { errors: [PostMediaNotInserted] };
    }

    // increment post total on users
    try {
      await getConnection()
        .getRepository(User)
        .increment({ id: creator!.id }, "totalPosts", 1);
    } catch (err) {
      logger.error(err);
      return { errors: [TotalPostsNotIncremented] };
    }

    return { post };
  }

  @Query(() => [Post])
  async posts() {
    return await Post.find({ relations: ["creator"] });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id", () => String) id: string,
    @Ctx() context: AppContext
  ) {
    try {
      // ensure the post exists
      let postToDelete = await Post.findOneOrFail(
        { id, creatorID: context.jwtPayload?.userID },
        { relations: ["creator"] }
      );

      // decrement total posts from the user
      await getConnection()
        .getRepository(User)
        .decrement(
          { id: context.jwtPayload?.userID, totalPosts: MoreThan(0) },
          "totalPosts",
          1
        );

      await Post.delete({ id: postToDelete.id });
    } catch (err) {
      logger.error(err);
      return false;
    }

    return true;
  }
}
