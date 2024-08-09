
const express = require("express");
const router = express.Router();
const { Homepage } = require("../models");

router.get("/", async (req, res) => {
  try {
    const homepage = await Homepage.findAll();
    res.json(homepage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newHomepage = await Homepage.create(req.body);
    res.status(201).json(newHomepage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedHomepage = await Homepage.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedHomepage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Homepage.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Homepage deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
