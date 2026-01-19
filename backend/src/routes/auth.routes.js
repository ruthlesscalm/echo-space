import express from "express";
import { authRegister, authLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authRegister);
router.post("/login", authLogin);

export default router;
