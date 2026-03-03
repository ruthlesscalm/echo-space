import express from "express";
import {
  authRegister,
  authLogin,
  accessTokenRefresh,
  logout,
} from "../controllers/auth.controller.js";
import requireAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", authRegister);
router.post("/login", authLogin);
router.post("/refresh", accessTokenRefresh);
router.post("/logout", logout);
router.post("/admin", requireAuth, (req, res) => {
  res.json({
    page: "admin",
  });
});

export default router;
