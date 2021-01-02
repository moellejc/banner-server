import { validate } from "class-validator";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection, InsertResult, MoreThan } from "typeorm";
import { AppContext } from "../../context/AppContext";
import { logger } from "../../Logging/Logger";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { convertValidationErrors } from "../errors/FieldError";
import {
  PostAuthorNotFound,
  PostNotCreated,
  TotalPostsNotIncremented,
} from "../errors/PostErrors";
import { PostCreateInput } from "./inputs/PostInputs";
import { PostResponse } from "./responses/PostResponses";

@Resolver()
export class PostResolver {
  @Mutation(() => PostResponse)
  async createPost(
    @Arg("options", () => PostCreateInput) options: PostCreateInput,
    @Ctx() { req, res }: AppContext
  ): Promise<PostResponse> {
    const errors = convertValidationErrors(await validate(options));
    if (errors.length > 0) {
      logger.error(errors);
      return { errors };
    }

    let author: User = new User();

    // find author
    try {
      author = (await User.findOne({ id: options.authorID })) || new User();

      if (!author.id) {
        return { errors: [PostAuthorNotFound] };
      }
    } catch (err) {
      logger.error(err);
      return { errors: [PostAuthorNotFound] };
    }

    let post;

    // insert post
    try {
      const insertPostQuery = getConnection()
        .createQueryBuilder()
        .insert()
        .into(Post)
        .values({
          author: author,
          message: options.message,
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

    // increment post total on users
    try {
      await getConnection()
        .getRepository(User)
        .increment({ id: author!.id }, "totalPosts", 1);
    } catch (err) {
      logger.error(err);
      return { errors: [TotalPostsNotIncremented] };
    }

    return { post };
  }

  @Query(() => [Post])
  async posts() {
    return await Post.find({ relations: ["author"] });
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id", () => String) id: string) {
    try {
      // ensure the post exists
      let postToDelete = await Post.findOneOrFail(
        { id },
        { relations: ["author"] }
      );

      // decrement total posts from the user
      await getConnection()
        .getRepository(User)
        .decrement(
          { id: postToDelete.author.id, totalPosts: MoreThan(0) },
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
