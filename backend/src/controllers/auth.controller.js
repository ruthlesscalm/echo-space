import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "node:crypto";

const cookieOptions = {
  httpOnly: true, //javascript cannot read cookies
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

const normalize = (value) => value?.toLowerCase().trim();

async function authRegister(req, res) {
  const username = normalize(req.body?.username);
  const email = normalize(req.body?.email);
  const password = req.body?.password;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      code: "MISSING_FIELDS",
      message: "username/email/password cannot be empty",
    });
  }
  if (password.length < 8 || password.length > 72) {
    return res.status(400).json({
      success: false,
      code: "INVALID_PASSWORD_FORMAT",
      message: "Password must be between 8 and 72 characters",
    });
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      code: "USER_EXISTS",
      message: "User already registered",
    });
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: encryptedPassword,
      role: "user",
    });
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "Register successful",
      user: {
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        code: "USER_EXISTS",
        message: "User already registered",
      });
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        error: Object.fromEntries(
          Object.values(err.errors).map((item) => {
            return [item.path, item.message];
          }),
        ),
      });
    }
    console.log("Error while Authentication: ", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
}
async function authLogin(req, res) {
  const email = normalize(req.body?.email);
  const password = req.body?.password;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      code: "MISSING_FIELDS",
      message: "email or password cannot be empty",
    });
  }
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        code: "INVALID_LOGIN",
        message: "Invalid email or password",
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({
        success: false,
        code: "INVALID_LOGIN",
        message: "Invalid email or password",
      });
    }

    const authToken = jwt.sign(
      { userID: user._id, role: user.role },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "15m",
      },
    );
    const refreshToken = jwt.sign(
      { userID: user._id, role: user.role },
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
        message: "Login successful",
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
      code: "NO_REFRESH_TOKEN",
      message: "Refresh token missing",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    const newAccessToken = jwt.sign(
      { userID: decoded.userID, role: decoded.role },
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
    const isExpired = err.name === "TokenExpiredError";

    return res.status(isExpired ? 401 : 400).json({
      success: false,
      code: isExpired ? "REFRESH_EXPIRED" : "INVALID_REFRESH",
      message: isExpired ? "Refresh token expired" : "Invalid refresh token",
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
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function forgotPassword(req, res) {
  const email = normalize(req.body?.email);
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "email cannot be empty",
    });
  }
  try {
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(200).json({
        success: true,
        message: "OTP sent to your email",
      });
    }
    const otp = crypto.randomInt(100000, 1000000);
    const hashedOtp = crypto
      .createHash("sha256")
      .update(String(otp))
      .digest("hex");

    await User.findOneAndUpdate(
      { email },
      {
        otp: hashedOtp,
        otpExpiresAt: Date.now() + 10 * 60 * 1000,
      },
    );

    await transporter.sendMail({
      from: `"Echo Space" <auth@ruthlesscalm.me>`,
      to: email,
      subject: "OTP for Password Reset",
      text: `your OTP is ${otp}. Valid for 10 minutes`,
      html: `<p> Your OTP is <strong>${otp}</strong>. Valid for 10 minutes</p>`,
    });
    return res
      .status(200)
      .json({ success: true, message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

async function verifyOTP(req, res) {
  res.json({
    message: "welcome to verify otp",
  });
}

async function resetPassword(req, res) {
  res.json({
    message: "Welcome to reset password",
  });
}

export {
  authRegister,
  authLogin,
  accessTokenRefresh,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword,
};
