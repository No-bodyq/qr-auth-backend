import User from "./user.js";
import Role from "./role.js";
import Meal from "./meal.js";
import Permission from "./permission.js"; // Changed from { Permission }

const models = { User, Role, Permission, Meal };

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;
