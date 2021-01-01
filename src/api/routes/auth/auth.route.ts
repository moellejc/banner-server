import { Router } from "express";
import AuthController from "./auth.controller";

const router: Router = Router();
const controller = new AuthController();

// Sign In
router.post("/refresh_token", controller.refreshToken);

export default router;
