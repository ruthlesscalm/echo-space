import jwt from "jsonwebtoken";

async function requireAuth(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
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
