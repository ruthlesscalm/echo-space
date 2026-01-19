import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, email, password } = req.body || {};

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Usename, email or password cannot be empty",
    });
  }
});

export default router;
