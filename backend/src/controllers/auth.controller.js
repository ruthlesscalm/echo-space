import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    const user = await User.findOne({ email: email });

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

    const token = jwt.sign(password, process.env.JWT_SECRET_KEY, {
      expiresIn: "15min",
    });
    return res.status(200).json({
      success: true,
      message: "User loggined successfully",
      token,
    });
  } catch (err) {
    console.log("Error while Authentication: ", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
}

export { authRegister, authLogin };
