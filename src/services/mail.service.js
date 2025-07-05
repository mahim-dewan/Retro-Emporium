import { createTransport } from "nodemailer";

// Email Transporter
export const transporter = createTransport({
  service: "Gmail",
  host: "smtp.email.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.author_email,
    pass: process.env.email_pass,
  },
});
