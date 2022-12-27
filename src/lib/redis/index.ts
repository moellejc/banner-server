import { createClient } from "redis";
import { RedisClientType } from "../../types/Redis";

export const getRedisClient = (): RedisClientType => {
  const client = createClient({
    url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  return client;
};
