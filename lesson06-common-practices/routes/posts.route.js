import express from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

import { posts } from "../utils/mockData.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    data: posts,
  });
});

router.get("/:id", (req, res) => {
  const currentDate = new Date();
  const postId = req.params.id;

  const existingPost = posts.find((post) => post.id === postId);

  if (!existingPost) {
    return res.json({
      message: "Resource is not existence",
    });
  }

  return res.json({
    data: existingPost,
  });
});

router.post("/", (req, res) => {
  const body = req.body;

  const newPost = {
    ...body,
    id: uuidv4(),
  };

  posts.push(newPost);

  res.json({
    message: "Create new post successfully",
  });
});

router.put("/:id", (req, res) => {
  const postId = req.params.id;
  const body = req.body;

  const existingPostIndex = posts.findIndex((post) => post.id === postId);

  if (existingPostIndex === -1) {
    return res.json({
      message: "Resource is not exist",
    });
  }

  const updatedPost = {
    ...posts[existingPostIndex],
    ...body,
  };

  posts[existingPostIndex] = updatedPost;

  return res.json({
    message: "Update successfully",
  });
});

router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  const existingPostIndex = posts.findIndex((post) => post.id === postId);
  if (existingPostIndex === -1) {
    return res.json({
      message: "Resource is not exist",
    });
  }

  posts.splice(existingPostIndex, 1);

  return res.json({
    message: "Delete successfully",
  });
});

export default router;
