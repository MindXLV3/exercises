import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/users.js";
import bcrypt from 'bcrypt';
export const login =  async (req, res) => {
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
    if (!existingUser.isActive) {
      return res.status(401).json({
        message: "Not active!",
      });
    }
  
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
}

export const signup =  async (req, res) => {
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
      if (existingUser.isActive){
        return res.status(401).json({
          message: "User has already exist!",
        });
      } else {
        await UserModel.deleteOne({email})
      }
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
}

export const verify = async (req, res) => {
    const { token } = req.body;
  
    if (!token) { // http status
      return res.status(404).json({
        message: "Token is not found",
      });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const {email} = decoded;
      //   1. Validation
      if (!email) {
        return res.status(400).json({
          message: "Token is invalid!",
        });
      }
  
      //   2. Check authentication
      const existingUser = await UserModel.findOne({email});
  
    
      if (!existingUser) {
        return res.status(401).json({
          message: "User has already exist!",
        })
      } else {
        if (existingUser.isActive) {
          return res.status(401).json({
            message: "User has already active!",
          })
        }
      }
      // 3. Update db
      await UserModel.updateOne({email}, { isActive: true }); // db đã được update nhưng trong code đang chạy thì chưa cập nhật
  
      // 4. Update model (code)
      existingUser.isActive = true;
      await existingUser.save();
  
      res.json({message: existingUser});
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
  
}
