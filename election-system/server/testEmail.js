require('dotenv').config(); // Load .env variables
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // rashigarg803@gmail.com
    pass: process.env.EMAIL_PASS  // ibbbhpdjbdhqssgd
  }
});

transporter.sendMail({
  to: 'rashigarg803@gmail.com',
  subject: 'Test Email',
  text: 'Hello from Node.js'
}, (err, info) => {
  if (err) console.error('Email error:', err);
  else console.log('Email sent:', info.response);
});