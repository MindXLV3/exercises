import express from "express";
import {users} from "../utils/usersMockData.js";

const router = express.Router();

router.get("/statistic", (req, res) => {
    let result = users.map(({username, comments=0, posts=0, users=0}) => ({user: username, comments, posts, users}))
    res.json({
        data: result
    });
});

export default router;
