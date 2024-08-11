const express = require("express");
const router = express.Router();
const { Report, ChatArea, User } = require("../models"); // Make sure User model is also included
const { validateToken } = require("../middlewares/auth");

// Create a new report
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

router.get("/:id", validateToken, async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id, {
      include: [
        {
          model: ChatArea,
          attributes: ["title", "content", "link", "imageFile"],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    console.error("Error fetching report details:", error);
    res.status(500).json({ error: error.message });
  }
});


// Get all reports
router.get("/", validateToken, async (req, res) => {
  try {
    const reports = await Report.findAll({
      include: [
        {
          model: ChatArea,
          attributes: ["title", "content"],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update the status of a report
router.put("/:id", validateToken, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["RESOLVED", "DELETED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const report = await Report.findByPk(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    report.status = status;
    await report.save();

    res.json(report);
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
