import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    next()
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded)
    req.role = decoded.role;
    req.userId = decoded.id;
    next();
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
};
