import logger from "../../utils/logger.js";
import jwt from "jsonwebtoken";

const errorMiddleware = (err, req, res, next) => {
  // Log error details using Winston
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Handle JWT authentication errors
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      status: "error",
      message: "Session expired. Please log in again.",
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: "error",
      message: "Invalid token. Please log in again.",
    });
  }

  // Handle Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Handle Sequelize unique constraint errors
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      status: "error",
      message: "Resource already exists",
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Handle Sequelize foreign key constraint errors
  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      status: "error",
      message: `Invalid reference: ${
        err.index || "Foreign key constraint failed"
      }`,
      field: err.fields || "unknown",
    });
  }

  // Handle custom AppError
  if (err.isOperational) {
    return res.status(err.statusCode || 400).json({
      status: "error",
      message: err.message,
    });
  }

  // Handle unknown errors (pass them to Express' default error handler)
  next(err);

  // Respond with 500 Internal Server Error
  return res.status(500).json({
    status: "error",
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
};

export default errorMiddleware;
