import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class RolePermission extends Model {}

RolePermission.init(
  {
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Roles",
        key: "id",
      },
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Permissions",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "RolePermission",
    timestamps: true,
  }
);

export { RolePermission };
