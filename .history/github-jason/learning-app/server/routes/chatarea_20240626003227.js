const express = require("express");
const router = express.Router();
const { User, Announcement } = require("../models");
const { Op } = require("sequelize");
const yup = require("yup");
const { validateToken } = require("../middlewares/auth");

router.post("/", validateToken, async (req, res) => {
  let data = req.body;
  data.userId = req.user.id;
  // Validate request body
  let validationSchema = yup.object({
    title: yup.string().trim().min(3).max(200).required(),
    content: yup.string().trim().min(3).max(1000).required(),
  });
  try {
    data = await validationSchema.validate(data, { abortEarly: false });
    let result = await ChatArea.create(data);
    res.json(result);
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
});

module.exports = router;