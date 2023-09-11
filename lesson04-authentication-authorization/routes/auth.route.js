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
    role: 'admin',
    isActive: true
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
  if (!existingUser.isActive) {
    return res.status(401).json({
      message: "Not active!",
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

  let id = uuidv4()
  const newUser = {
    ...body,
    id: id,
    role: 'guest', // default,
    isActive: false
  };

  userMockData.push(newUser);
  const jwtPayload = {
    username: username,
    id: id,
    password: password
  };

  const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
    expiresIn: "120s",
  });
  res.json({message: 'Success', accessToken: token,});
});


router.post("/verify", (req, res) => {
  const { token } = req.body;

  if (!token) { // http status
    return res.status(404).json({
      message: "Token is not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const {username, password} = decoded;
    //   1. Validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Token is invalid!",
      });
    }

    //   2. Check authentication
    const existingUserIndex = userMockData.findIndex(
      (u) => u.username === username && u.password === password
    );

    if (existingUserIndex === -1) {
      return res.json({
        message: "User is not exist",
      });
    }
  
    const updatedUser = {
      ...userMockData[existingUserIndex],
      isActive: true
    };
  
    userMockData[existingUserIndex] = updatedUser;

    res.json({message: 'User is active!'});
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({
        message: "Token is expired",
      });
    }

    return res.status(401).json({
      message: "Token is not valid",
    });
  }

});
export default router;
