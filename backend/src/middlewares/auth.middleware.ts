import type { Request, Response, NextFunction } from "express";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token: string = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, config.jwtAccessToken);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export default requireAuth;
