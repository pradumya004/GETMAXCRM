
// utils/emailTransporter.js
import nodemailer from 'nodemailer';
import { generateEmailTemplate } from './emailTemplate.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendWelcomeEmail = async (to, employeeId, password) => {
  try {
    await transporter.sendMail({
      from: '"HR Department" <hr@yourcompany.com>',
      to: to,
      subject: 'Welcome to Our Company - Your Account Credentials',
      html: generateEmailTemplate(employeeId, password)
    });
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};
