import AppError from "../../utils/AppError.js";

/**
 * Middleware to check if user has required roles
 * @param {...string} roles - Roles allowed to access the route
 */
export const requireRoles = (...roles) => {
  return (req, res, next) => {
    // Check if user exists (should be attached by authMiddleware)
    if (!req.user) {
      return next(new AppError("User not authenticated", 401));
    }

    // Check if user's role is in the allowed roles
    if (!roles.includes(req.user.roleId)) {
      return next(new AppError("Not authorized to access this resource", 403));
    }

    next();
  };
};
