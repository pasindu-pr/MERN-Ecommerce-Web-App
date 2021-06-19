import asyncHandler from "express-async-handler";
import { sendEmail } from "../Utilities/smtpSetup.js";

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

export { sendSignUpMail };
