import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Meal extends Model {
  static associate(models) {
    // A Meal can have many Users
    Meal.hasMany(models.User, { foreignKey: "mealId", as: "users" });
  }
}

Meal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Meal",
    tableName: "Meals",
    timestamps: true,
  }
);

export default Meal;
