// server/controllers/signupController.js
const User = require("../models/User");

exports.create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
