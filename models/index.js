import User from "./user.js";
import Role from "./role.js";
import Meal from "./meal.js";
import Permission from "./permission.js";
import RolePermission from "./rolePermission.js";
import MealHistory from "./mealHistory.js";
import UserMeal from "./userMeal.js";

const models = {
  User,
  Role,
  Permission,
  Meal,
  RolePermission,
  MealHistory,
  UserMeal,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;
