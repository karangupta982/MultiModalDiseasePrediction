import express from "express";
const router = express.Router();

import {
  login,
  signup,
  sendotp,
  changePassword,
} from "../controllers/Auth.js";
import {
  resetPasswordToken,
  resetPassword,
} from "../controllers/ResetPassword.js";

import { auth } from "../Middleware/Auth";

router.post("/login", login);

router.post("/signup", signup);

router.post("/sendotp", sendotp);

router.post("/changepassword", auth, changePassword);

router.post("/reset-password-token", resetPasswordToken);

router.post("/reset-password", resetPassword);
router.post("/update-password", resetPassword);

module.exports = router;
