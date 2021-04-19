import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
} from "../Controllers/authenticationControllers.js";
import { authenticatedMiddleware } from "../Middlewares/authenticationMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/my-profile").get(authenticatedMiddleware, getUserProfile);

export default router;
