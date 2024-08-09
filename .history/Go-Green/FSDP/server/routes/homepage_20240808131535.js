// server/routes/content.js
const express = require("express");
const router = express.Router();
const { Content } = require("../models");

router.get("/", async (req, res) => {
  try {
    const content = await Content.findAll();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newContent = await Content.create(req.body);
    res.status(201).json(newContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedContent = await Content.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Content.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Content deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
