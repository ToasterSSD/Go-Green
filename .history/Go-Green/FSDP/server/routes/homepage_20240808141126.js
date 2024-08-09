const express = require("express");
const router = express.Router();
const { User, Homepage } = require("../models");
const { Op } = require("sequelize");
const yup = require("yup");
const { validateToken, checkAdminRole } = require("../middlewares/auth");

// Create new homepage content
router.post("/", validateToken, async (req, res) => {
  let data = req.body;
  data.userId = req.user.id;

  // Validate request body
  let validationSchema = yup.object({
    section: yup.string().trim().min(3).max(200).required(),
    title: yup.string().trim().min(3).max(200).required(),
    description: yup.string().trim().min(3).max(5000).required(),
    buttonText: yup.string().trim().min(3).max(200).required(),
    image: yup.string().trim().url().optional(),
    link: yup.string().trim().url().optional(),
  });

  try {
    data = await validationSchema.validate(data, { abortEarly: false });
    let result = await Homepage.create(data);
    res.json(result);
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
});

// Show all homepage content
router.get("/", async (req, res) => {
  let condition = {};
  let search = req.query.search;
  if (search) {
    condition[Op.or] = [
      { section: { [Op.like]: `%${search}%` } },
      { title: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
    ];
  }

  let list = await Homepage.findAll({
    where: condition,
    order: [["createdAt", "DESC"]],
    include: { model: User, as: "user", attributes: ["name"] },
  });
  res.json(list);
});

// Show homepage content by id
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let homepage = await Homepage.findByPk(id, {
    include: { model: User, as: "user", attributes: ["name"] },
  });
  if (!homepage) {
    res.sendStatus(404);
    return;
  }
  res.json(homepage);
});

// Update homepage content via id
router.put("/:id", validateToken, async (req, res) => {
  let id = req.params.id;
  let homepage = await Homepage.findByPk(id);
  if (!homepage) {
    res.sendStatus(404);
    return;
  }

  // Check if user is the owner or has ADMIN role
  if (req.user.id === homepage.userId || req.user.roles.includes("ADMIN")) {
    let data = req.body;

    // Validate request body
    let validationSchema = yup.object({
      section: yup.string().trim().min(3).max(200).optional(),
      title: yup.string().trim().min(3).max(200).optional(),
      description: yup.string().trim().min(3).max(5000).optional(),
      buttonText: yup.string().trim().min(3).max(200).optional(),
      image: yup.string().trim().url().optional(),
      link: yup.string().trim().url().optional(),
    });

    try {
      data = await validationSchema.validate(data, { abortEarly: false });

      let num = await Homepage.update(data, {
        where: { id: id },
      });
      if (num == 1) {
        res.json({
          message: "Homepage content was updated successfully.",
        });
      } else {
        res.status(400).json({
          message: `Cannot update homepage content with id ${id}.`,
        });
      }
    } catch (err) {
      res.status(400).json({ errors: err.errors });
    }
  } else {
    res
      .status(403)
      .json({ message: "You do not have the required permissions" });
  }
});

// Delete homepage content via id
router.delete("/:id", validateToken, async (req, res) => {
  let id = req.params.id;
  let homepage = await Homepage.findByPk(id);
  if (!homepage) {
    res.sendStatus(404);
    return;
  }

  // Check if user is the owner or has ADMIN role
  if (req.user.id === homepage.userId || req.user.roles.includes("ADMIN")) {
    let num = await Homepage.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.json({
        message: "Homepage content was deleted successfully.",
      });
    } else {
      res.status(400).json({
        message: `Cannot delete homepage content with id ${id}.`,
      });
    }
  } else {
    res
      .status(403)
      .json({ message: "You do not have the required permissions" });
  }
});

module.exports = router;
