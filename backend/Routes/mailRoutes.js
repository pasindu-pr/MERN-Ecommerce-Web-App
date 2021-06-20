import express from "express";
import {
  sendSignUpMail,
  sendPaymentMail,
} from "../Controllers/mailControllers.js";

const router = express.Router();

router.route("/newsignup").post(sendSignUpMail);
router.route("/paymentconfirm").post(sendPaymentMail);

export default router;
