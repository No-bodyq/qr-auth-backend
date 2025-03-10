import { Router } from "express";
import * as mealController from "../controllers/mealController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { requireRoles } from "../middlewares/roleMiddleware.js";
import requirePermissions from "../middlewares/permissionMiddleware.js";

const mealRouter = Router();

mealRouter
  .route("/:id")
  .get(
    authMiddleware,
    requirePermissions("meal:read"),
    mealController.getMealById
  );

mealRouter
  .route("/:id/check-availability")
  .get(
    authMiddleware,
    requirePermissions("meal:read"),
    mealController.isMealTypeAvailable
  );

mealRouter
  .route("/history/:userId")
  .get(
    authMiddleware,
    requirePermissions("meal:read"),
    mealController.getMealHistory
  );

// Route to consume a meal
mealRouter
  .route("/consume")
  .post(
    authMiddleware,
    requirePermissions("meal:update"),
    mealController.consumeMeal
  );

export default mealRouter;
