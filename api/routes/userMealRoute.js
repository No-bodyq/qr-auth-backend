import { Router } from "express";
import * as userMealController from "../controllers/userMealController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { requireRoles } from "../middlewares/roleMiddleware.js";
import requirePermissions from "../middlewares/permissionMiddleware.js";

const userMealRouter = Router();

// Route to get user's meal status (mealsLeft & daysLeft)
userMealRouter
  .route("/user-meal-status")
  .get(
    authMiddleware,
    requirePermissions("meal:read"),
    userMealController.getUserMealStatus
  );

export default userMealRouter;
