import axios, { AxiosResponse } from "axios";
import OAuth from "oauth-1.0a";
import * as Crypto from "crypto";

interface HereTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export const getAccessToken = async (): Promise<
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

export const isAccessTokenValid = async (): Promise<boolean> => {
  return true;
};

export const refreshAccessToken = async (): Promise<void> => {};

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
