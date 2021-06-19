import express from "express";
import { sendSignUpMail } from "../Controllers/mailControllers.js";

const router = express.Router();

router.route("/newsignup").post(sendSignUpMail);

export default router;
