const express = require("express");
const router = express.Router();
const { Registration } = require("../models");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

router.post(
  "/register",
  [
    body("announcementId").isInt(),
    body("salutation").isString().notEmpty(),
    body("fullName").isString().notEmpty(),
    body("email").isEmail(),
    body("phoneNumber").isString().notEmpty(),
    body("emergencyContactName").isString().notEmpty(),
    body("emergencyContactNo").isString().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const registration = await Registration.create(req.body);

      // Send confirmation email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: registration.email,
        subject: "Registration Confirmation",
        text: `Hi ${registration.fullName},\n\nThank you for registering for this session. A confirmation email has been sent to your email.\n\nDate: Sunday, May 26, 2024\nTime: 2:00 PM\nLocation: Marina Bay East Gardens`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Failed to send confirmation email");
        } else {
          console.log("Email sent: " + info.response);
          res.status(201).json(registration);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
