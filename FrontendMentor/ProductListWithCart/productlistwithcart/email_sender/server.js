const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Rate Limiting: Prevent spam attacks
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit to 5 requests per IP
  message: "Too many email requests, please try again later.",
});

app.post("/send-email", emailLimiter, async (req, res) => {
  const { senderName, senderEmail, subject, message } = req.body;

  if (!senderName || !senderEmail || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      auth: {
        user: process.env.EMAIL_USER, // Stored securely
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
