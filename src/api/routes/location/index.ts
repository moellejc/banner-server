import { Router, Request, Response } from "express";
import LocationController from "./controller";

const router: Router = Router();
const controller = new LocationController();

router.post("/location/address", controller.reverseGeocode);
router.post("/location/places", controller.placesAtLocation);

export default router;
