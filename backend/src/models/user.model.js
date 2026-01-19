import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      validate: {
        validator: (v) => !/[^a-zA-Z0-9_]/.test(v),
        message:
          "Invalid Username, Username can only contain alphabets, numbers and underscores",
      },
      lowercase: true,
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 254,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 72,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
