import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info", // Default log level
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Adds timestamp
    format.errors({ stack: true }), // Includes stack traces
    format.json() // Logs in JSON format
  ),
  transports: [
    new transports.Console({
      // Logs to console
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({ filename: "logs/error.log", level: "error" }), // Logs errors to a file
    new transports.File({ filename: "logs/combined.log" }), // Logs all messages
  ],
});

export default logger;
