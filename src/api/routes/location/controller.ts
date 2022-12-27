import { Request, Response } from "express";
import { getRedisClient } from "../../../lib/redis";
import { reverseGeocode, placesAtLocation } from "../../../lib/heremaps";
import { HERE_ACCESS_TOKEN } from "../../../constants/cache";

const redisClient = getRedisClient();

export default class LocationController {
  public reverseGeocode = async (req: Request, res: Response): Promise<any> => {
    if (!req.body.lat || !req.body.lon) return;

    let lat = +req.body.lat;
    let lon = +req.body.lon;

    await redisClient.connect();
    const hereToken = await redisClient.get(HERE_ACCESS_TOKEN);

    if (!hereToken) return;

    const address = await reverseGeocode(lat, lon, hereToken);

    await redisClient.disconnect();

    return res.send({ data: address?.data });
  };

  public placesAtLocation = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    if (!req.body.lat || !req.body.lon) return;

    let lat = +req.body.lat;
    let lon = +req.body.lon;

    await redisClient.connect();
    const hereToken = await redisClient.get(HERE_ACCESS_TOKEN);

    if (!hereToken) return;

    const places = await placesAtLocation(lat, lon, hereToken);

    await redisClient.disconnect();
    return res.send({ data: places?.data });
  };
}
