import axios, { AxiosResponse } from "axios";
import OAuth from "oauth-1.0a";
import * as Crypto from "crypto";

export const getAccessToken = async (): Promise<
  AxiosResponse<any, any> | undefined
> => {
  var replace_base_str = "";
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
        Authorization: oauth.toHeader(oauth.authorize(request_data))
          .Authorization,
      },
    });

    return hereJWT;
  } catch (error) {
    console.log("Here Maps JWT Error");
    console.log(error);
  }

  return;
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

export const updateLocation = () => {};
