import UserMeal from "../../models/userMeal.js";
import AppError from "../../utils/AppError.js";

/**
 * Get meals left and days left for a user
 */
export const getUserMealStatus = async (req, res, next) => {
  try {
    // Extract userId from the JWT token
    const userId = req.user.id;

    // Find the UserMeal entry for the user
    const userMeal = await UserMeal.findOne({
      where: { userId },
      attributes: ["mealsLeft", "mealsUsed"],
    });

    if (!userMeal) {
      return next(new AppError("User meal data not found", 404));
    }

    res.json(userMeal);
  } catch (error) {
    console.error("The error is: ", error);
    next(error);
  }
};
