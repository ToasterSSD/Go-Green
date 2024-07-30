const express = require("express");
const router = express.Router();
const { User, Announcement } = require("../models");
const { Op } = require("sequelize");
const yup = require("yup");
const { validateToken, checkAdminRole } = require("../middlewares/auth");

// Create new announcement
router.post("/", validateToken, async (req, res) => {
  let data = req.body;
  data.userId = req.user.id;
  // Validate request body
  let validationSchema = yup.object({
    title: yup.string().trim().min(3).max(200).required(),
    content: yup.string().trim().min(3).max(5000).required(),
  });
  try {
    data = await validationSchema.validate(data, { abortEarly: false });
    let result = await Announcement.create(data);
    res.json(result);
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
});

// Show all announcements
router.get("/", async (req, res) => {
  let condition = {};
  let search = req.query.search;
  if (search) {
    condition[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { content: { [Op.like]: `%${search}%` } },
    ];
  }

  let list = await Announcement.findAll({
    where: condition,
    order: [["createdAt", "DESC"]],
    include: { model: User, as: "user", attributes: ["name"] },
  });
  res.json(list);
});

// Show announcement by id
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let announcement = await Announcement.findByPk(id, {
    include: { model: User, as: "user", attributes: ["name"] },
  });
  if (!announcement) {
    res.sendStatus(404);
    return;
  }
  res.json(announcement);
});

// Update announcement via id
router.put("/:id", validateToken, async (req, res) => {
  let id = req.params.id;
  let announcement = await Announcement.findByPk(id);
  if (!announcement) {
    res.sendStatus(404);
    return;
  }

  // Check if user is the owner or has ADMIN role
  if (req.user.id === announcement.userId || req.user.roles.includes("ADMIN")) {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object({
      title: yup.string().trim().min(3).max(100),
      content: yup.string().trim().min(3).max(5000),
      link: yup.string().trim().url(),
    });
    try {
      data = await validationSchema.validate(data, { abortEarly: false });

      let num = await Announcement.update(data, {
        where: { id: id },
      });
      if (num == 1) {
        res.json({
          message: "Announcement was updated successfully.",
        });
      } else {
        res.status(400).json({
          message: `Cannot update announcement with id ${id}.`,
        });
      }
    } catch (err) {
      res.status(400).json({ errors: err.errors });
    }
  } else {
    res.status(403).json({ message: "You do not have the required permissions" });
  }
});

// Delete announcement via id
router.delete("/:id", validateToken, async (req, res) => {
  let id = req.params.id;
  let announcement = await Announcement.findByPk(id);
  if (!announcement) {
    res.sendStatus(404);
    return;
  }

  // Check if user is the owner or has ADMIN role
  if (req.user.id === announcement.userId || req.user.roles.includes("ADMIN")) {
    let num = await Announcement.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.json({
        message: "Announcement was deleted successfully.",
      });
    } else {
      res.status(400).json({
        message: `Cannot delete announcement with id ${id}.`,
      });
    }
  } else {
    res.status(403).json({ message: "You do not have the required permissions" });
  }
});

module.exports = router;
