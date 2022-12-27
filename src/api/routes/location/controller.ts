import { Request, Response } from "express";
import { getRedisClient } from "../../../lib/redis";
import {
  reverseGeocode,
  placesAtLocation,
  getAccessToken,
  validOrRefreshToken,
} from "../../../lib/heremaps";
import { HERE_ACCESS_TOKEN } from "../../../constants/cache";

const redisClient = getRedisClient();

export default class LocationController {
  public reverseGeocode = async (req: Request, res: Response): Promise<any> => {
    if (!req.body.lat || !req.body.lon) return;

    // get location coords
    let lat = +req.body.lat;
    let lon = +req.body.lon;

    // get here token
    const hereToken = await validOrRefreshToken(await getAccessToken());

    const address = await reverseGeocode(lat, lon, hereToken!);

    return res.send({ data: address?.data });
  };

  public placesAtLocation = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    if (!req.body.lat || !req.body.lon) return;

    // get location coords
    let lat = +req.body.lat;
    let lon = +req.body.lon;

    // get here token
    const hereToken = await validOrRefreshToken(await getAccessToken());

    const places = await placesAtLocation(lat, lon, hereToken!);

    return res.send({ data: places?.data });
  };
}
