import nodemailer from "nodemailer";
import signUpEmail from "./signUpTemplate.js";

let transporter = nodemailer.createTransport({
  service: "Yandex",
  auth: {
    user: process.env.YANDEX_MAIL,
    pass: process.env.YANDEX_APP_PASSWORD,
  },
});

const sendEmail = async (subject, senderEmail, userName) => {
  let info = await transporter.sendMail({
    from: '"Emporium Store" <emporiumstore@yandex.com>', // sender address
    to: senderEmail, // list of receivers
    subject: subject, // Subject line
    text: "", // plain text body
    html: signUpEmail(userName), // html body
  });

  console.log(info);

  if (info) {
    return true;
  }
};

export { sendEmail };
