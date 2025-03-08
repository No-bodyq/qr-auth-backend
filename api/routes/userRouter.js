import { Router } from "express";
import * as userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { requireRoles } from "../middlewares/roleMiddleware.js";
import requirePermissions from "../middlewares/permissionMiddleware.js";

const userRouter = Router();

userRouter
  .route("/")
  .get(authMiddleware, requireRoles("admin"), userController.getUsers)
  .post(
    authMiddleware,
    requirePermissions("user:create"),
    userController.createUser
  );

userRouter
  .route("/:id")
  .get(authMiddleware, userController.getUserById)
  .put(
    authMiddleware,
    requirePermissions("user:update"),
    userController.updateUser
  )
  .delete(
    authMiddleware,
    requirePermissions("user:delete"),
    userController.deleteUser
  );

export default userRouter;
