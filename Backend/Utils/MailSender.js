import nodemailer from "nodemailer";
import dotenv from "dotenv";



dotenv.config();

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      secure: false,
    });
    let info = await transporter.sendMail({
      from: `"PredictCare AI" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    return info;
  } catch (error) {
    console.log("error in mailSender",error.message);
    return error.message;
  }
};

module.exports = mailSender;
