import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const otpStore = {};

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Server running...");
});

// Send Email Route
app.post("/send-email", async (req, res) => {
  const { email } = req.body;
  const now = Date.now();

  // Initialize store for new users
  if (!otpStore[email]) {
    otpStore[email] = {
      otp: null,
      timestamp: 0,
      resendAttempts: 0,
      lastResendTime: 0
    };
  }

  const userData = otpStore[email];

  // 1. Resend Cooldown Check (30 seconds)
  const cooldownPeriod = 30 * 1000;
  if (userData.lastResendTime && (now - userData.lastResendTime < cooldownPeriod)) {
    const remaining = Math.ceil((cooldownPeriod - (now - userData.lastResendTime)) / 1000);
    return res.status(429).json({
      message: `Please wait ${remaining} seconds before resending.`
    });
  }

  // 2. Max Resend Attempts Check (3 attempts)
  if (userData.resendAttempts >= 3) {
    return res.status(403).json({
      message: "Maximum resend attempts reached. Please try again later."
    });
  }

  // 3. Generate New OTP (Old OTP is automatically invalidated)
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Update data
  userData.otp = otp;
  userData.timestamp = now;
  userData.lastResendTime = now;
  userData.resendAttempts += 1;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It will expire in 2 minutes.`
    });

    res.json({
      message: "Email sent successfully",
      resendAttempts: userData.resendAttempts
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Email sending failed" });
  }
});

// Verify OTP Route
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const now = Date.now();

  const userData = otpStore[email];

  if (!userData || !userData.otp) {
    return res.status(400).json({ message: "No OTP found for this email" });
  }

  // 1. Expiry Check (2 minutes)
  const expiryPeriod = 2 * 60 * 1000;
  if (now - userData.timestamp > expiryPeriod) {
    delete otpStore[email]; // Invalidate on expiry
    return res.status(410).json({ message: "OTP has expired" });
  }

  // 2. Verification Check
  if (userData.otp == otp) {
    delete otpStore[email]; // Clear store on success
    return res.json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
});
console.log("EMAIL:", process.env.EMAIL_USER);
console.log("PASS:", process.env.EMAIL_PASS);

app.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}`);
});