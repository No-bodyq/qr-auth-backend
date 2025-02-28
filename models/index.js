import User from "./user.js";
import Role from "./role.js";

const models = { User, Role };

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export default models;
