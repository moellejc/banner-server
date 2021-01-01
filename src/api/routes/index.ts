import { Router } from "express";
import auth from "./auth/auth.route";

const router: Router = Router();

router.use("/", auth);

export default router;
