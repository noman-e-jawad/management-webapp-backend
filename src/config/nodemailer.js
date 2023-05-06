import dotenv from 'dotenv';
import { createTransport } from 'nodemailer';
dotenv.config();

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
});

export const setMailOptions = (email, link) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: 'Hello World',
    html: `<p>Your Password Reset Link is:</p><br><p>${link}</p>`,
  };
  return mailOptions;
};

export const sendMail = async (mailOptions) => {
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

// `Janitorial Leads Pro <${process.env.SMTP_EMAIL}>`;
