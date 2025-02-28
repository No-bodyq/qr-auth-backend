import { Router } from "express";
import * as userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { requireRoles } from "../middlewares/roleMiddleware.js";
import { requirePermissions } from "../middlewares/permissionMiddleware.js";

const userRouter = Router();

userRouter
  .route("/")
  .get(authMiddleware, requireRoles("admin"), userController.getUsers);
userRouter.get("/:id", authMiddleware, userController.getUserById);
// router.post("/", userController.createUser);
// router.put("/:id", authMiddleware, userController.updateUser);
// router.delete("/:id", authMiddleware, userController.deleteUser);

export default userRouter;

// // Permission-based routes
// router.post('/',
//   authMiddleware,
//   requirePermissions('user:create'),
//   userController.createUser
// );

// router.put('/:id',
//   authMiddleware,
//   requirePermissions('user:update'),
//   userController.updateUser
// );

// router.delete('/:id',
//   authMiddleware,
//   requirePermissions('user:delete'),
//   userController.deleteUser
// );
