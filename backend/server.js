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
<<<<<<< HEAD
  const currentMemory = otpStore[email];

  if (currentMemory && currentMemory.lockedUntil && Date.now() < currentMemory.lockedUntil) {
    return res.status(403).json({ message: "Account locked due to multiple failed attempts. Please try again after 60 minutes." });
  }
=======
  const now = Date.now();
>>>>>>> 7610c3e2af957f2d5a7ed7b06ad2032a9dccd585

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

<<<<<<< HEAD
  otpStore[email] = {
    otp: otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    createdAt: Date.now(),
    attempts: 0
  };
=======
  // Update data
  userData.otp = otp;
  userData.timestamp = now;
  userData.lastResendTime = now;
  userData.resendAttempts += 1;
>>>>>>> 7610c3e2af957f2d5a7ed7b06ad2032a9dccd585

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
    delete otpStore[email]; // clean up on error
    res.status(500).json({ message: "Email sending failed" });
  }
});

<<<<<<< HEAD
app.post("/resend-otp", async (req, res) => {
  const { email } = req.body;
  const currentMemory = otpStore[email];

  if (currentMemory && currentMemory.lockedUntil && Date.now() < currentMemory.lockedUntil) {
    return res.status(403).json({ message: "Account locked due to multiple failed attempts. Please try again after 60 minutes." });
  }

  if (currentMemory) {
    // 5-minute cooldown check
    if (currentMemory.resendCreatedAt && Date.now() < currentMemory.resendCreatedAt + 5 * 60 * 1000) {
      return res.status(429).json({ message: "Please wait 05:00 before resending OTP." });
    }

    // 1-hour limit check (max 5 resends)
    const oneHourMs = 60 * 60 * 1000;
    if (currentMemory.firstResendAt) {
      if (Date.now() < currentMemory.firstResendAt + oneHourMs) {
        if (currentMemory.resendCount >= 5) {
          return res.status(429).json({ message: "Maximum OTP limits reached. Please wait 1 hour." });
        }
      } else {
        // Reset after 1 hour has passed since first resend
        currentMemory.resendCount = 0;
        currentMemory.firstResendAt = Date.now();
      }
    }
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  // Track counts
  const newResendCount = (currentMemory && currentMemory.resendCount) ? currentMemory.resendCount + 1 : 1;
  const newFirstResendAt = (currentMemory && currentMemory.firstResendAt) ? currentMemory.firstResendAt : Date.now();

  otpStore[email] = {
    otp: otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
    createdAt: currentMemory ? currentMemory.createdAt : Date.now(),
    resendCreatedAt: Date.now(),
    resendCount: newResendCount,
    firstResendAt: newFirstResendAt,
    attempts: 0
  };

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your New OTP Code",
      text: `Your new OTP is: ${otp}`
    });
    res.json({ message: "OTP resent successfully", otp });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Email sending failed" });
  }
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (record && record.lockedUntil && Date.now() < record.lockedUntil) {
    return res.status(403).json({ message: "Account locked due to multiple failed attempts. Please try again after 60 minutes." });
  }

  if (!record || record.lockedUntil) {
    return res.status(400).json({ message: "OTP not found or expired." });
  }

  // Check Expiry (5 Min)
  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP Expired" });
  }

  // Check Attempts (Max 5)
  if (record.attempts >= 4 && record.otp != otp) { // If it's the 5th attempt (0-indexed to 4) and wrong
    otpStore[email] = {
      lockedUntil: Date.now() + 60 * 60 * 1000 // lock for 60 minutes
    };
    return res.status(403).json({ message: "Max attempts reached. Account locked for 60 minutes." });
  }

  if (record.otp == otp) {
    delete otpStore[email]; // remove after success
=======
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
>>>>>>> 7610c3e2af957f2d5a7ed7b06ad2032a9dccd585
    return res.json({ message: "OTP verified successfully" });
  } else {
    record.attempts += 1; // Increment attempts
    return res.status(400).json({ message: `Invalid OTP. Attempts left: ${5 - record.attempts}` });
  }
});

console.log("EMAIL:", process.env.EMAIL_USER);
console.log("PASS:", process.env.EMAIL_PASS);

app.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}`);
});