const { Scene, Choice } = require('../models');

const createScene = async (req, res) => {
  try {
    const { title, description } = req.body;
    const scene = await Scene.create({ title, description });
    res.status(201).json(scene);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getScene = async (req, res) => {
  try {
    const scene = await Scene.findByPk(req.params.id, {
      include: Choice
    });
    if (scene) {
      res.status(200).json(scene);
    } else {
      res.status(404).json({ error: 'Scene not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};