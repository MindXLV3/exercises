import express from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/users.js";
import bcrypt from 'bcrypt';

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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //   1. Validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Missing required keys",
    });
  }

  //   2. Check authentication
  const existingUser = await UserModel.findOne({email});

  if (!existingUser) {
    return res.status(401).json({
      message: "Invalid email or password!",
    });
  }
  // if (!existingUser.isActive) {
  //   return res.status(401).json({
  //     message: "Not active!",
  //   });
  // }

  // 3. Check password
  const isValidPassword = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isValidPassword) {
    return res.status(401).json({
      message: 'Password is wrong!'
    })
  }

  //   3. Generate access token (JWT)
  //   - Header: thuật toán mã hoá(HS256) + loại token(JWT)
  //   - Body: chứa thông tin mà developer muốn đính kèm vào token (Thông tin không nhạy cảm)
  //   - Footer: chứa thông tin về chữ ký (khoá bí mật -> SECRET_KEY)
  //   - Mỗi thành phần cách nhau bởi dấu "."

  const jwtPayload = {
    email: existingUser.username,
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
    message: 'Login success!'
  });
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { email, password, fullname } = body;

  //   1. Validation
  if (!email || !password || !fullname) {
    return res.status(400).json({
      message: "Missing required keys",
    });
  }

  //   2. Check authentication
  const existingUser = await UserModel.findOne({email});

  if (existingUser) {
    return res.status(401).json({
      message: "User has already exist!",
    });
  }

  // 3. Create new user -> insert to db
  // 3.1 Hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3.2 Create new user object

  const newUser = new UserModel({
    email: email,
    fullname: fullname,
    role: 'guest', // default,
    isActive: false,
    password: hashedPassword
  })

  // 3.3 Insert user to db
  await newUser.save() 

  const jwtPayload = {
    email
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
