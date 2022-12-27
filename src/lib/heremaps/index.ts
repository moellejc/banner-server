import axios, { AxiosResponse } from "axios";
import OAuth from "oauth-1.0a";
import * as Crypto from "crypto";
import jwt from "jsonwebtoken";
import { RedisClientType } from "../../types/Redis";
import { getRedisClient } from "../../lib/redis";
import { HERE_ACCESS_TOKEN } from "../../constants/cache";
import { NonNullTypeNode } from "graphql";

const cacheClient = getRedisClient();

interface HereTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export const generateAccessToken = async (): Promise<
  HereTokenResponse | undefined
> => {
  const oauth = new OAuth({
    consumer: {
      key: process.env.HERE_KEY_ID!, //Access key
      secret: process.env.HERE_KEY_SECRET!, //Secret key
    },
    signature_method: "HMAC-SHA256",
    hash_function(base_string: string, key: string) {
      return Crypto.createHmac("sha256", key)
        .update(base_string)
        .digest("base64");
    },
  });

  const request_data = {
    url: "https://account.api.here.com/oauth2/token",
    method: "POST",
    data: { grant_type: "client_credentials" },
  };

  try {
    let hereJWT = await axios.post(request_data.url, request_data.data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: oauth.toHeader(oauth.authorize(request_data))
          .Authorization,
      },
    });

    return hereJWT.data;
  } catch (error) {
    console.log("Here Maps JWT Error");
    console.log(error);
  }

  return;
};

export const isAccessTokenValid = (token: string): boolean => {
  if (!token) return false;

  try {
    let dateNow = new Date();
    let decoded = jwt.decode(token, { complete: true }) as any;
    // if token not expired then don't get a new token
    if (decoded.header.exp <= dateNow.getTime() / 1000) {
      return false;
    }
  } catch (err) {
    console.log("Here Maps Token Error");
    console.log(err);
    return false;
  }
  return true;
};

export const refreshAccessToken = async (): Promise<string | null> => {
  await cacheClient.connect();

  var getNewToken = true;
  var token = await cacheClient.get(HERE_ACCESS_TOKEN);

  // check for valid stored token
  if (token) getNewToken = !isAccessTokenValid(token);

  if (getNewToken) {
    const tokenData = await generateAccessToken();
    if (tokenData) {
      await cacheClient.set(HERE_ACCESS_TOKEN, tokenData.access_token);
      token = tokenData.access_token;
    }
  }

  await cacheClient.disconnect();

  return token;
};

export const validOrRefreshToken = async (
  token: string | null
): Promise<string | null> => {
  if (isAccessTokenValid(token!)) return token;
  const newToken = await refreshAccessToken();
  return newToken;
};

export const getAccessToken = async (): Promise<string | null> => {
  await cacheClient.connect();
  const storedToken = await cacheClient.get(HERE_ACCESS_TOKEN);
  await cacheClient.disconnect();

  return storedToken;
};

export const reverseGeocode = async (
  lat: number,
  lon: number,
  token: string
): Promise<AxiosResponse<any, any> | undefined> => {
  try {
    let reverseGeo = await axios.get(
      `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lon}&lang=en-US`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return reverseGeo;
  } catch (error) {
    console.log(error);
  }

  return;
};

export const placesAtLocation = async (
  lat: number,
  lon: number,
  token: string
): Promise<AxiosResponse<any, any> | undefined> => {
  try {
    let places = await axios.get(
      `https://browse.search.hereapi.com/v1/browse?at=${lat},${lon}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return places;
  } catch (error) {
    console.log(error);
  }

  return;
};
