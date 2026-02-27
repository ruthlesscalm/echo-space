import express from "express";
import {
  authRegister,
  authLogin,
  accessTokenRefresh,
  logout,
} from "../controllers/auth.controller.js";
import protectPage from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", authRegister);
router.post("/login", authLogin);
router.post("/refresh", accessTokenRefresh);
router.post("/logout", logout);
router.post("/admin", protectPage, (req, res) => {
  res.send("Welcome to admin page");
});

export default router;
