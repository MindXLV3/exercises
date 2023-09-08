import express from "express";
import postRouter from "./posts.js";
import userRouter from "./users.js";
import commentRouter from "./comments.js";
import statisticRouter from "./statistic.js";
import logAPI from "../middlewares/logAPI.js";
import countRequest from "../middlewares/countRequest.js";

// router dùng để khai báo url cho api
const router = express.Router();

router.use("/system", statisticRouter);

router.use(countRequest);
// chuẩn REST FULL API
// /posts/ -> 5 api bắt đầu bằng /posts/ +
router.use("/posts", postRouter);
// /users/ -> 1 api bắt đầu bằng /users/ +
router.use("/users", userRouter);
router.use("/comments", commentRouter);


export default router;
