import Meal from "../../models/meal.js";
import MealDetail from "../../models/mealDetail.js";
import MealHistory from "../../models/mealHistory.js";
import AppError from "../../utils/AppError.js";
import { Op, col, fn, Sequelize } from "sequelize";

/**
 * Get meal by ID
 */
export const getMealById = async (req, res, next) => {
  try {
    const meal = await Meal.findByPk(req.params.id);

    if (!meal) {
      return next(new AppError("Meal not found", 404));
    }

    res.json(meal);
  } catch (error) {
    next(error);
  }
};

/**
 * Check if a specified meal type is available
 */
export const isMealTypeAvailable = async (req, res, next) => {
  try {
    const { mealType } = req.body; // mealType should be 'breakfast', 'lunch', or 'supper'
    const { id } = req.params; // mealId is now taken from the URL

    if (!["breakfast", "lunch", "supper"].includes(mealType)) {
      return next(new AppError("Invalid meal type", 400));
    }

    const mealDetail = await MealDetail.findOne({
      where: { mealId: id },
      attributes: [mealType],
    });

    if (!mealDetail) {
      return next(new AppError("Meal details not found", 404));
    }

    res.json({ available: mealDetail[mealType] });
  } catch (error) {
    next(error);
  }
};

/**
 * Get meal history for a user
 */
export const getMealHistory = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const mealHistory = await MealHistory.findAll({
      where: { userId },
      attributes: [
        "userId",
        "mealId",
        "mealType",
        "dateConsumed",
        "createdAt",
        "updatedAt",
      ],
    });

    if (!mealHistory.length) {
      return next(new AppError("No meal history found for this user", 404));
    }

    res.json(mealHistory);
  } catch (error) {
    console.error("Database Query Error:", error);
    next(error);
  }
};

/**
 * Handles meal consumption by verifying meal type availability and updating meal history.
 */
export const consumeMeal = async (req, res, next) => {
  try {
    const { name, matricNumber, mealType, mealId, userId } = req.body;

    // Validate meal type
    if (!["breakfast", "lunch", "supper"].includes(mealType)) {
      return next(new AppError("Invalid meal type", 400));
    }

    // Get current date in UTC format (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    // Check if meal type is available for the given mealId
    const mealDetail = await MealDetail.findOne({
      where: { mealId },
      attributes: ["breakfast", "lunch", "supper"],
    });

    if (!mealDetail) {
      return next(new AppError("Meal details not found", 404));
    }

    // Check if the requested meal type is available
    if (!mealDetail[mealType]) {
      return next(
        new AppError(
          `The selected meal type (${mealType}) is not available`,
          400
        )
      );
    }

    // Prevent duplicate meal consumption by checking both mealType and dateConsumed
    const existingMeal = await MealHistory.findOne({
      where: {
        userId,
        mealId,
        mealType,
        [Op.and]: [
          Sequelize.where(fn("DATE", col("dateConsumed")), today), // Compare only the date part
        ],
      },
    });

    if (existingMeal) {
      return next(new AppError("Meal already consumed today!", 400));
    }

    // Record the meal consumption in MealHistory
    await MealHistory.create({
      userId,
      mealId,
      mealType: mealType,
      dateConsumed: new Date(), // Store full timestamp
    });

    res.json({
      success: true,
      message: `Meal (${mealType}) successfully consumed by ${name} (${matricNumber})`,
    });
  } catch (error) {
    console.error("Meal Consumption Error:", error);
    next(error);
  }
};
