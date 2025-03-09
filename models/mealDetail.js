import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class MealDetail extends Model {
  static associate(models) {
    MealDetail.belongsTo(models.Meal, {
      foreignKey: "mealId",
      as: "meal",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  }
}

MealDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    breakfast: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lunch: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    supper: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "MealDetail",
    tableName: "MealDetails",
    timestamps: true,
  }
);

export default MealDetail;
