// routes/reports.js

const express = require("express");
const router = express.Router();
const { Report } = require("../models");
const { validateToken } = require("../middlewares/auth");

router.post("/", validateToken, async (req, res) => {
  try {
    const { postId, type, description } = req.body;

    if (!postId || !type) {
      return res
        .status(400)
        .json({ error: "Post ID and Report type are required" });
    }

    const report = await Report.create({
      postId,
      userId: req.user.id,
      type,
      description,
    });

    res.json(report);
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
