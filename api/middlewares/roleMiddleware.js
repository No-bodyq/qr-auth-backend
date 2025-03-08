import AppError from "../../utils/AppError.js";

/**
 * Middleware to check if user has required roles
 * @param {...string} roles - Allowed role names
 */
export const requireRoles = (...roles) => {
  return (req, res, next) => {
    // Ensure user is authenticated
    if (!req.user) {
      return next(new AppError("User not authenticated", 401));
    }

    // Get role from user object or from JWT token that was attached to req.user
    const roleName = req.user.role?.name || req.user.role;

    // Ensure user role exists
    if (!roleName) {
      return next(new AppError("User role not found", 403));
    }

    // Check if user's role is allowed
    if (!roles.includes(roleName)) {
      return next(new AppError("Not authorized to access this resource", 403));
    }

    next();
  };
};
