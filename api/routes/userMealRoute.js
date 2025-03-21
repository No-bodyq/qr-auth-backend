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

userMealRouter
  .route("/get-user-meals")
  .get(authMiddleware, requireRoles("admin"), userMealController.getUserMeals);

userMealRouter
  .route("/get-user-meal-by-id")
  .post(
    authMiddleware,
    requireRoles("admin"),
    userMealController.getUserMealById
  );

export default userMealRouter;
