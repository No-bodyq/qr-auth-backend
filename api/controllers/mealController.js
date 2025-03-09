import Meal from "../../models/meal.js";
import MealDetail from "../../models/mealDetail.js";
import MealHistory from "../../models/mealHistory.js";
import AppError from "../../utils/AppError.js";

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
