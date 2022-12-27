import { Request, Response } from "express";
import { getRedisClient } from "../../../lib/redis";
import { reverseGeocode, placesAtLocation } from "../../../lib/heremaps";
import { HERE_ACCESS_TOKEN } from "../../../constants/cache";

const redisClient = getRedisClient();

export default class LocationController {
  public reverseGeocode = async (req: Request, res: Response): Promise<any> => {
    if (!req.query.lat || !req.query.lon) return;

    let lat = +req.query.lat;
    let lon = +req.query.lon;

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
    if (!req.query.lat || !req.query.lon) return;

    let lat = +req.query.lat;
    let lon = +req.query.lon;

    await redisClient.connect();
    const hereToken = await redisClient.get(HERE_ACCESS_TOKEN);

    if (!hereToken) return;

    const places = await placesAtLocation(lat, lon, hereToken);

    await redisClient.disconnect();
    return res.send({ data: places?.data });
  };
}
