import express from "express";
import postRouter from "./posts.route.js";
import userRouter from "./users.route.js";
import commentRouter from "./comments.route.js";
import authRouter from "./auth.route.js";
import logAPI from "../middlewares/logAPI.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(logAPI);

router.use("/auth", authRouter);
router.use("/posts", authMiddleware, postRouter);
router.use("/users", userRouter);
router.use("/comments", commentRouter);

export default router;
