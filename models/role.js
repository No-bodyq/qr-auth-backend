import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Role extends Model {
  static associate(models) {
    Role.belongsToMany(models.Permission, {
      through: models.RolePermission, // Use the actual model reference
      foreignKey: "roleId",
      otherKey: "permissionId",
    });

    Role.hasMany(models.User, {
      foreignKey: "roleId",
      as: "users",
    });
  }
}

Role.init(
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
    modelName: "Role",
    timestamps: true,
  }
);

export default Role;
