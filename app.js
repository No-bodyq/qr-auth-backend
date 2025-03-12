import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./api/routes/userRouter.js";
import authRouter from "./api/routes/authRoute.js";
import mealRouter from "./api/routes/mealRoute.js";
import errorMiddleware from "./api/middlewares/errorMiddleware.js";
import userMealRouter from "./api/routes/userMealRoute.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(errorMiddleware);

app.use("/api/v1/meal", mealRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/user-meal", userMealRouter);
app.use("/api/v1/auth", authRouter);

export default app;
