// controllers/gameController.js
const { UserProgress } = require('../models');

const saveGameProgress = async (req, res) => {
  const { currentPartId, playerResponses, deathCount } = req.body;
  const userId = req.user.id;

  try {
    let userProgress = await UserProgress.findOne({ where: { userId } });
    if (!userProgress) {
      userProgress = await UserProgress.create({ userId, currentPartId, playerResponses, deathCount });
    } else {
      userProgress.currentPartId = currentPartId;
      userProgress.playerResponses = playerResponses;
      userProgress.deathCount = deathCount;
      await userProgress.save();
    }

    res.json({ message: 'Progress saved successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving progress.', error });
  }
};

const loadGameProgress = async (req, res) => {
  const userId = req.user.id;

  try {
    const userProgress = await UserProgress.findOne({ where: { userId } });
    if (userProgress) {
      res.json(userProgress);
    } else {
      res.status(404).json({ message: 'No saved progress found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error loading progress.', error });
  }
};

const deleteGameProgress = async (req, res) => {
  const userId = req.user.id;

  try {
    await UserProgress.destroy({ where: { userId } });
    res.json({ message: 'Progress deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting progress.', error });
  }
};

module.exports = { saveGameProgress, loadGameProgress, deleteGameProgress };
