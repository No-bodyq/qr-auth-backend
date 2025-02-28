// src/api/middlewares/permissionMiddleware.js
import { Permission } from "../../models/permission.js";
import { RolePermission } from "../../models/rolePermission.js";
import AppError from "../../utils/AppError.js";

/**
 * Middleware to check if user has required permissions
 * @param {...string} requiredPermissions - Permissions required to access the route
 */
export const requirePermissions = (...requiredPermissions) => {
  return async (req, res, next) => {
    try {
      // Check if user exists (should be attached by authMiddleware)
      if (!req.user) {
        return next(new AppError("User not authenticated", 401));
      }

      // Get user's role permissions
      const rolePermissions = await RolePermission.findAll({
        where: { roleId: req.user.roleId },
        include: [
          {
            model: Permission,
            where: {
              name: requiredPermissions,
            },
          },
        ],
      });

      // Check if user has all required permissions
      const hasAllPermissions = requiredPermissions.every((permission) =>
        rolePermissions.some((rp) => rp.Permission.name === permission)
      );

      if (!hasAllPermissions) {
        return next(new AppError("Insufficient permissions", 403));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
