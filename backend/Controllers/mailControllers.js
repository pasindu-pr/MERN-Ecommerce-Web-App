import asyncHandler from "express-async-handler";
import { sendEmail, sendPaymentConfirmEmail } from "../Utilities/smtpSetup.js";

const sendSignUpMail = asyncHandler(async (req, res) => {
  const { user, uEmail } = req.body;

  console.log(user, uEmail);

  const sendRegistrationEmail = await sendEmail(
    "Welcome to Emporium",
    uEmail,
    user
  );
  if (sendRegistrationEmail) {
    res.status(200);
    res.json("Email Sent!");
  } else {
    res.status(500);
  }
});

const sendPaymentMail = asyncHandler(async (req, res) => {
  const { uEmail, orderID, TotalPrice, payMethod } = req.body;

  console.log(uEmail, orderID, TotalPrice, payMethod);

  const sendRegistrationEmail = await sendPaymentConfirmEmail(
    "Payment Successful",
    uEmail,
    orderID,
    TotalPrice,
    payMethod
  );
  if (sendRegistrationEmail) {
    res.status(200);
    res.json("Email Sent!");
  } else {
    res.status(500);
  }
});

export { sendSignUpMail, sendPaymentMail };
