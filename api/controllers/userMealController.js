import UserMeal from "../../models/userMeal.js";
import AppError from "../../utils/AppError.js";
import User from "../../models/user.js";
import Meal from "../../models/meal.js";

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

export const getUserMeals = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "roleId", "matricNumber"],
      include: [
        {
          model: Meal,
          attributes: ["name"],
          as: "meal",
        },
      ],
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserMealById = async (req, res, next) => {
  try {
    const users = await User.findOne({
      where: { matricNumber: req.body.matricNumber },
      attributes: ["id", "username", "email", "roleId", "matricNumber"],
      include: [
        {
          model: Meal,
          attributes: ["name"],
          as: "meal",
        },
      ],
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
};
