import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/health", (req: Request, res: Response) => {
  return res.send({
    message: `${process.env.APP_NAME} is live on ${process.env.APP_HOST}:${process.env.APP_PORT}. \nENV: ${process.env.APP_ENV}`,
  });
});

export default router;
