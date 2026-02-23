import express from "express";
import {
  authRegister,
  authLogin,
  accessTokenRefresh,
  logout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authRegister);
router.post("/login", authLogin);
router.post("/refresh", accessTokenRefresh);
router.post("/logout", logout);

export default router;
