const express = require("express");
const router = express.Router();
const { User, Feedback } = require("../models");
const { Op } = require("sequelize");
const yup = require("yup");
const { validateToken } = require("../middlewares/auth");

// Create new feedback
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
    let result = await Feedback.create(data);
    res.json(result);
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
});

// show all feedbacks
router.get("/", async (req, res) => {
  let condition = {};
  let search = req.query.search;
  if (search) {
    condition[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { content: { [Op.like]: `%${search}%` } },
    ];
  }
  // You can add condition for other columns here
  // e.g. condition.columnName = value;

  let list = await Feedback.findAll({
    where: condition,
    order: [["createdAt", "DESC"]],
    include: { model: User, as: "user", attributes: ["name"] },
  });
  res.json(list);
});

// show feedback by id
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let feedback = await Feedback.findByPk(id, {
    include: { model: User, as: "user", attributes: ["name"] },
  });
  // Check id not found
  if (!feedback) {
    res.sendStatus(404);
    return;
  }
  res.json(feedback);
});

// update feedback via id
router.put("/:id", validateToken, async (req, res) => {
  let id = req.params.id;
  // Check id not found
  let feedback = await Feedback.findByPk(id);
  if (!feedback) {
    res.sendStatus(404);
    return;
  }

  // Check request user id
  let userId = req.user.id;
  if (feedback.userId != userId) {
    res.sendStatus(403);
    return;
  }

  let data = req.body;
  // Validate request body
  let validationSchema = yup.object({
    title: yup.string().trim().min(3).max(100),
    description: yup.string().trim().min(3).max(500),
  });
  try {
    data = await validationSchema.validate(data, { abortEarly: false });

    let num = await Feedback.update(data, {
      where: { id: id },
    });
    if (num == 1) {
      res.json({
        message: "Feedback was updated successfully.",
      });
    } else {
      res.status(400).json({
        message: `Cannot update feedback with id ${id}.`,
      });
    }
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
});

// delete feedback via id
router.delete("/:id", validateToken, async (req, res) => {
  let id = req.params.id;
  // Check id not found
  let feedback = await Feedback.findByPk(id);
  if (!feedback) {
    res.sendStatus(404);
    return;
  }

  // Check request user id
  let userId = req.user.id;
  if (feedback.userId != userId) {
    res.sendStatus(403);
    return;
  }

  let num = await Feedback.destroy({
    where: { id: id },
  });
  if (num == 1) {
    res.json({
      message: "Feedback was deleted successfully.",
    });
  } else {
    res.status(400).json({
      message: `Cannot delete feedback with id ${id}.`,
    });
  }
});

module.exports = router;
