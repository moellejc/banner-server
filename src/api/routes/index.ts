import { Router } from "express";
import auth from "./auth/auth.route";
import health from "./health/health.route";
import location from "./location";

const router: Router = Router();

router.use("/", auth);
router.use("/", location);
router.use("/", health);

export default router;
