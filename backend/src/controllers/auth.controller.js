import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true, //javascript cannot read cookies
  secure: false, // temporary in development for http , true in production for https
  sameSite: "lax",
};

async function authRegister(req, res) {
  const { username, email, password } = req.body || {};
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "username/email/password cannot be empty",
    });
  }
  if (password.length < 8 || password.length > 72) {
    return res.status(400).json({
      success: false,
      message: "Password must be between 8 and 72 characters",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const normalizedUsername = username.toLowerCase();
    const normalizedEmail = email.toLowerCase();
    const newUser = new User({
      username: normalizedUsername,
      email: normalizedEmail,
      password: encryptedPassword,
      role: "user",
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User registered successfull",
      user: {
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "User already registered, please login",
      });
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: Object.fromEntries(
          Object.values(err.errors).map((item) => {
            return [item.path, item.message];
          }),
        ),
      });
    }
    console.log("Error while Authentication: ", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
}
async function authLogin(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "email or password cannot be empty",
    });
  }
  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are not registered yet, please register first",
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials, please try again",
      });
    }

    const authToken = jwt.sign(
      { userID: user._id },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "15m",
      },
    );
    const refreshToken = jwt.sign(
      { userID: user._id },
      process.env.JWT_REFRESH_TOKEN,
      {
        expiresIn: "7d",
      },
    );
    return res
      .cookie("authToken", authToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "User loggined successfully",
      });
  } catch (err) {
    console.log("Error while Authentication: ", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
}

async function accessTokenRefresh(req, res) {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No refresh token found",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    const newAccessToken = jwt.sign(
      { userID: decoded.userID },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "15m",
      },
    );
    res
      .cookie("authToken", newAccessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Token refreshed successfully",
      });
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Refresh Token",
      });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Refresh token expired",
      });
    }
    console.log("Token refresh Error: ", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function logout(req, res) {
  try {
    return res
      .clearCookie("authToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (err) {
    console.log("Logout Error: ", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export { authRegister, authLogin, accessTokenRefresh, logout };
