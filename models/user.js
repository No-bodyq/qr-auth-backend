import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class User extends Model {
  static associate(models) {
    // Associate User with Role
    User.belongsTo(models.Role, {
      foreignKey: "roleId",
      as: "role",
    });

    // Associate User with Meal
    User.belongsTo(models.Meal, {
      foreignKey: "mealId",
      as: "meal",
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    matricNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Meals",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      defaultValue: 3,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Roles",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);

export default User;
