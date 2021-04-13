import "reflect-metadata";
import { createConnection } from "typeorm";
import { Follow } from "../src/api/entities/Follow";
import { Like } from "../src/api/entities/Like";
import { Post } from "../src/api/entities/Post";
import { Reply } from "../src/api/entities/Reply";
import { User } from "../src/api/entities/User";
import { EnvLevels } from "../src/constants/EnvLevels";

(async () => {
  if (
    process.env.APP_ENV === EnvLevels.PROD ||
    process.env.APP_ENV === EnvLevels.QA
  ) {
    console.log(
      "Database can not be cleared this way for Production or QA databases"
    );
  }

  console.log("Create connection to database");

  const con = await createConnection({
    type: "postgres",
    database: "farbicdb",
    synchronize: false,
    logging: true,
    // entities: [__dirname + "../src/api/entities/**/*{.js,.ts}"],
    entities: [User, Post, Follow, Like, Reply],
    migrations: [__dirname + "../src/database/migrations/**/*.js"],
    subscribers: [__dirname + "../src/api/subscribers/**/*.js"],
    cli: {
      entitiesDir: __dirname + "../src/api/entities",
      migrationsDir: __dirname + "../src/database/migrations",
      subscribersDir: __dirname + "../src/api/subscribers",
    },
  });

  console.log("Clean Follows...");
  await con.getRepository(Follow).delete({});
  console.log("Clean Likes...");
  await con.getRepository(Like).delete({});
  console.log("Clean Replies...");
  await con.getRepository(Reply).delete({});
  console.log("Clean Posts...");
  await con.getRepository(Post).delete({});
  console.log("Clean Users...");
  await con.getRepository(User).delete({});
})();
