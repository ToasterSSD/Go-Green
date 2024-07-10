const express = require("express");
const router = express.Router();
const { User, ChatArea } = require("../models");
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

// show all announcements
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

  let list = await ChatArea.findAll({
    where: condition,
    order: [["createdAt", "DESC"]],
    include: { model: User, as: "user", attributes: ["name"] },
  });
  res.json(list);
});

// show announcement by id
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let announcement = await Announcement.findByPk(id, {
    include: { model: User, as: "user", attributes: ["name"] },
  });
  // Check id not found
  if (!announcement) {
    res.sendStatus(404);
    return;
  }
  res.json(announcement);
});


module.exports = router;