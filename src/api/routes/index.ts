import { Router } from "express";
import auth from "./auth/auth.route";
import health from "./health/health.route";

const router: Router = Router();

router.use("/", auth);
router.use("/", health);

export default router;
