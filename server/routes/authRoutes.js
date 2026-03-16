const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  refresh,
} = require("../controllers/authController");
const { loginLimiter } = require("../middleware/loginLimiter");
const schemaValidator = require("../middleware/schemaValidator");

router.get("/refresh", loginLimiter, refresh);
router.post(
  "/register",
  schemaValidator("authRegister"),
  loginLimiter,
  registerUser
);
router.post("/login", schemaValidator("authLogin"), loginLimiter, loginUser);

router.post("/logout", logOutUser);

module.exports = router;
