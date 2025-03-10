import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class UserMeal extends Model {
  static associate(models) {
    UserMeal.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    UserMeal.belongsTo(models.Meal, {
      foreignKey: "mealId",
      as: "meal",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  }
}

UserMeal.init(
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
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Meals",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    mealsLeft: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    mealsUsed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    daysLeft: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "UserMeal",
    tableName: "UserMeals",
    timestamps: true,
  }
);

export default UserMeal;
