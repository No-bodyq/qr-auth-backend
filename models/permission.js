import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Permission extends Model {
  static associate(models) {
    Permission.belongsToMany(models.Role, {
      through: models.RolePermission, // Use actual model reference
      foreignKey: "permissionId",
      otherKey: "roleId",
    });
  }
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Permission",
    timestamps: true,
  }
);

export default Permission;
