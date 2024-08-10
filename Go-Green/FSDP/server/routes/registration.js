// In your registration.js
const express = require("express");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const router = express.Router();

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

router.post(
  "/register",
  [
    // Validation middleware
    body("fullName").notEmpty().withMessage("Full Name is required"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("phoneNumber").isMobilePhone().withMessage("Phone Number is invalid"),
    // Add other validations as needed
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Handle the registration logic
    const {
      fullName,
      email,
      phoneNumber,
      emergencyContactName,
      emergencyContactNumber,
    } = req.body;

    // Send confirmation email
    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Registration Confirmation",
      text: `Hi ${fullName},\n\nThank you for registering for the event. Here are the details:\n\nName: ${fullName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nEmergency Contact: ${emergencyContactName} (${emergencyContactNumber})\n\nBest regards,\nYour Company`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Failed to send email", error });
      }
      res
        .status(200)
        .json({
          message: "Registration successful and confirmation email sent",
        });
    });
  }
);

module.exports = router;
