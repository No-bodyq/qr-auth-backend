import { Router } from "express";
import * as authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.route("/register").post(authController.register);

export default authRouter;
