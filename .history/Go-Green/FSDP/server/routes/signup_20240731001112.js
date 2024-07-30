// server/routes/signup.js
const express = require("express");
const router = express.Router();
const SignupController = require("../controllers/signupController");

// POST request to handle sign-up
router.post("/", SignupController.create);

module.exports = router;
