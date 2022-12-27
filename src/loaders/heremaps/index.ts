// load Here Maps
import { getAccessToken } from "../../lib/heremaps";
import { getRedisClient } from "../../lib/redis";
import { HERE_ACCESS_TOKEN } from "../../constants/cache";

const redisClient = getRedisClient();

export const heremapsLoader = async (): Promise<void> => {
  await redisClient.connect();

  const storedToken = await redisClient.get(HERE_ACCESS_TOKEN);

  // check for valid stored token

  const token = await getAccessToken();

  await redisClient.set(HERE_ACCESS_TOKEN, token?.data);

  await redisClient.disconnect();
};
