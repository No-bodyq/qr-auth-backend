// src/api/middlewares/permissionMiddleware.js
import Permission from "../../models/permission.js";
import RolePermission from "../../models/rolePermission.js";
import AppError from "../../utils/AppError.js";

/**
 * Middleware to check if user has required permissions
 * @param {...string} requiredPermissions - Required permissions to access the route
 */
const requirePermissions = (...requiredPermissions) => {
  return async (req, res, next) => {
    try {
      // Ensure user is authenticated
      if (!req.user) {
        return next(new AppError("User not authenticated", 401));
      }

      // Fetch the user's permissions directly
      const rolePermissions = await RolePermission.findAll({
        where: { roleId: req.user.roleId },
        attributes: [], // Exclude rolePermission fields, we only need the related Permission
        include: [
          {
            model: Permission,
            attributes: ["name"], // Fetch only permission names
          },
        ],
      });

      // Extract permission names from the result
      const userPermissions = rolePermissions.map((rp) => rp.Permission.name);

      // Check if the user has all required permissions
      const hasAllPermissions = requiredPermissions.every((perm) =>
        userPermissions.includes(perm)
      );

      if (!hasAllPermissions) {
        return next(new AppError("Insufficient permissions", 403));
      }

      next();
    } catch (error) {
      console.error("Permission Middleware Error:", error);
      next(new AppError("Internal Server Error", 500));
    }
  };
};

export default requirePermissions;
