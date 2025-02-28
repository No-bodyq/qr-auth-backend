import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./api/routes/userRouter.js";
import authRouter from "./api/routes/authRoute.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

export default app;
