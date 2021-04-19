import express from "express";
import {
  getPaymentIntentController,
  retriveAndUpdatePayment,
} from "../Controllers/paymentControllers.js";

const router = express.Router();

router.route("/stripe/payment-intent").post(getPaymentIntentController);
router.route("/stripe/update-payment").post(retriveAndUpdatePayment);

export default router;
