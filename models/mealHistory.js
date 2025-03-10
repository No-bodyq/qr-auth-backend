import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class MealHistory extends Model {}

MealHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Meals",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    mealType: {
      type: DataTypes.ENUM("breakfast", "lunch", "supper"),
      allowNull: false,
    },
    dateConsumed: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "MealHistory",
    tableName: "MealHistory",
    timestamps: true,
  }
);

export default MealHistory;
