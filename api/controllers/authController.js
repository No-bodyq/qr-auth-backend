import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/user.js";
import Role from "../../models/role.js";
import Permission from "../../models/permission.js";
import AppError from "../../utils/AppError.js";
import models from "../../models/index.js";
import { where } from "sequelize";

/**
 * Register a new user
 */
export const register = async (req, res, next) => {
  try {
    const { email, password, name, matricNo } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new AppError("User already exists", 400));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = await Role.findOne({ where: { name: "user" } });
    if (!userRole) {
      return next(new AppError("Default role not found", 500));
    }

    // Create new user (Assign default role "user")
    const user = await User.create({
      email: email,
      password: hashedPassword,
      username: name,
      matricNumber: matricNo,
      roleId: userRole.id,
    });

    // Fetch user's role & permissions
    const role = await Role.findOne({
      where: { id: user.roleId },
      include: [{ model: models.Permission, as: "Permissions" }],
    });

    const token = jwt.sign(
      {
        id: user.id,
        role: role.name,
        permissions: role.Permissions.map((p) => p.name),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.username,
        role: role.name,
        matricNo: user.matricNumber,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error.message, error.parent?.detail);
    next(error);
  }
};

/**
 * Login user
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: models.Role,
          as: "role",
          include: [{ model: models.Permission, as: "Permissions" }],
        },
      ],
    });

    if (!user) {
      return next(new AppError("Invalid credentials", 400));
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(new AppError("Invalid credentials", 400));
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role.name,
        permissions: user.role.Permissions.map((p) => p.name),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.username,
        role: user.role.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Current Authenticated User
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Role,
          as: "role",
          include: [{ model: Permission, attributes: ["name"] }],
        },
      ],
    });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Reset Password Request
 */
export const resetPasswordRequest = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Generate reset token
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // In real-world, send email instead of returning token
    res.json({ message: "Password reset link sent to email", resetToken });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset Password
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await User.update(
      { password: hashedPassword },
      { where: { id: decoded.id } }
    );

    res.json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};
