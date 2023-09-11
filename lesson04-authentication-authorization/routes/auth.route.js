import express from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const userMockData = [
  {
    id: "1",
    username: "admin",
    password: "1234",
    fullname: "ADMIN",
    role: 'admin'
  }
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  //   1. Validation
  if (!username || !password) {
    return res.status(400).json({
      message: "Missing required keys",
    });
  }

  //   2. Check authentication
  const existingUser = userMockData.find(
    (u) => u.username === username && u.password === password
  );

  if (!existingUser) {
    return res.status(401).json({
      message: "Invalid username or password!",
    });
  }

  //   3. Generate access token (JWT)
  //   - Header: thuật toán mã hoá(HS256) + loại token(JWT)
  //   - Body: chứa thông tin mà developer muốn đính kèm vào token (Thông tin không nhạy cảm)
  //   - Footer: chứa thông tin về chữ ký (khoá bí mật -> SECRET_KEY)
  //   - Mỗi thành phần cách nhau bởi dấu "."

  const jwtPayload = {
    username: existingUser.username,
    id: existingUser.id,
    fullname: existingUser.fullname,
    role: existingUser.role
  };

  const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
    expiresIn: "30s",
  });

  res.json({
    user: jwtPayload,
    accessToken: token,
  });
});

router.post("/signup", (req, res) => {
  const body = req.body;
  const { username, password } = body;

  //   1. Validation
  if (!username || !password) {
    return res.status(400).json({
      message: "Missing required keys",
    });
  }

  //   2. Check authentication
  const existingUser = userMockData.find(
    (u) => u.username === username && u.password === password
  );

  if (existingUser) {
    return res.status(401).json({
      message: "Duplicated user",
    });
  }

  const newUser = {
    ...body,
    id: uuidv4(),
    role: 'guest' // default
  };

  userMockData.push(newUser);

  res.json({message: 'Success'});
});

export default router;
