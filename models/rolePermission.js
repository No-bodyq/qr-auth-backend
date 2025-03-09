import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class RolePermission extends Model {
  static associate(models) {
    this.belongsTo(models.Role, { foreignKey: "roleId", onDelete: "CASCADE" });
    this.belongsTo(models.Permission, {
      foreignKey: "permissionId",
      onDelete: "CASCADE",
    });
  }
}

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

export default RolePermission;
