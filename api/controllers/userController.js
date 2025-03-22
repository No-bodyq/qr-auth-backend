import User from "../../models/user.js";
import bcrypt from "bcrypt";
import AppError from "../../utils/AppError.js";
import Meal from "../../models/meal.js";

/**
 * Get all users
 */
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "roleId", "matricNumber"],
      include: [
        {
          model: Meal,
          attributes: ["name"],
          as: "meal",
        },
      ],
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: [
        "id",
        "username",
        "email",
        "roleId",
        "matricNumber",
        "mealId",
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
 * Create a new user
 */
export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, roleId, matricNumber, mealId } =
      req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new AppError("User with this email already exists", 400));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      roleId,
      matricNumber,
      mealId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        roleId: newUser.roleId,
        matricNumber: newUser.matricNumber,
        mealId: newUser.mealId,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user by ID
 */
export const updateUser = async (req, res, next) => {
  try {
    const { username, email, password, roleId, matricNumber, mealId } =
      req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Update fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (roleId) user.roleId = roleId;
    if (matricNumber) user.matricNumber = matricNumber;
    if (mealId) user.mealId = mealId;

    await user.save();

    res.json({
      message: "User updated successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roleId: user.roleId,
        matricNumber: user.matricNumber,
        mealId: user.mealId,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user by ID
 */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
