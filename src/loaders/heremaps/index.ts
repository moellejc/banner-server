// load Here Maps
import { getAccessToken } from "../../lib/heremaps";
import { getRedisClient } from "../../lib/redis";
import { HERE_ACCESS_TOKEN } from "../../constants/cache";
import jwt from "jsonwebtoken";

const redisClient = getRedisClient();

export const heremapsLoader = async (): Promise<void> => {
  await redisClient.connect();

  const storedToken = await redisClient.get(HERE_ACCESS_TOKEN);

  if (!storedToken) return;

  // check for valid stored token
  var getNewToken = true;
  try {
    let dateNow = new Date();
    let decoded = jwt.decode(storedToken, { complete: true }) as any;
    // if token not expired then don't get a new token
    if (dateNow.getTime() / 1000 < decoded.header.exp) {
      console.log("Here JWT NOT Expired!!");
      getNewToken = false;
    }
    // 1672200497
    // 1672208275
    // 1672121991
  } catch (err) {
    console.log("Here.com Token Error");
    console.log(err);
  }

  if (getNewToken) {
    console.log("get new here token");
    const token = await getAccessToken();
    if (token) await redisClient.set(HERE_ACCESS_TOKEN, token.access_token);
  }

  await redisClient.disconnect();
};
