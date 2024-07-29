const { Choice } = require('../models');

const createChoice = async (req, res) => {
  try {
    const { text, nextSceneId, sceneId } = req.body;
    const choice = await Choice.create({ text, nextSceneId, sceneId });
    res.status(201).json(choice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};