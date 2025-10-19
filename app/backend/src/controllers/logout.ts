import express from "express";
import { Request, Response } from "express";
import { authenticate } from "./roles";

const logoutRouter = express.Router();

logoutRouter.post("/", authenticate, async (req: Request, res: Response) => {
  if (!req.userId) {
    res.status(400).json({
      error: "invalid logout request: not logged in",
    });
  } else {
    res.clearCookie("token");
    res.status(200).send({
      message: "Logged out successfully",
    });
  }
});

export default logoutRouter;