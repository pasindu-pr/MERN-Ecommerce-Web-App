import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  sendPasswordResetEmail,
  changePassword,
} from "../Controllers/authenticationControllers.js";
import { authenticatedMiddleware } from "../Middlewares/authenticationMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/my-profile").get(authenticatedMiddleware, getUserProfile);
router.route("/send-password-reset").post(sendPasswordResetEmail);
router.route("/reset-password").post(changePassword);

export default router;
