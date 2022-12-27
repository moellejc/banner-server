// load Here Maps
import { getAccessToken, isAccessTokenValid } from "../../lib/heremaps";
import { getRedisClient } from "../../lib/redis";
import { HERE_ACCESS_TOKEN } from "../../constants/cache";

const redisClient = getRedisClient();

export const heremapsLoader = async (): Promise<void> => {
  await redisClient.connect();

  var getNewToken = true;
  const storedToken = await redisClient.get(HERE_ACCESS_TOKEN);

  // check for valid stored token
  if (storedToken) {
    getNewToken = !isAccessTokenValid(storedToken);
  }

  if (getNewToken) {
    console.log("get new here token");
    const token = await getAccessToken();
    if (token) await redisClient.set(HERE_ACCESS_TOKEN, token.access_token);
  }

  await redisClient.disconnect();
};
