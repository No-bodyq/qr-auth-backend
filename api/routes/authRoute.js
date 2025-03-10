import { Router } from "express";
import * as authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.route("/register").post(authController.register);
authRouter.route("/login").post(authController.login);
authRouter
  .route("/curr-user")
  .get(authMiddleware, authController.getCurrentUser);

export default authRouter;
