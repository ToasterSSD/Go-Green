const { GamePart, UserProgress } = require('../models');

// Function to get the current game part by ID
const getGamePart = async (req, res) => {
  try {
    const part = await GamePart.findByPk(req.params.id);
    if (part) {
      res.json(part);
    } else {
      res.status(404).send('Game part not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Function to record a player's death and check for special ending conditions
const recordDeath = async (req, res) => {
  const { userId } = req.params;
  try {
    let userProgress = await UserProgress.findOne({ where: { userId } });
    if (!userProgress) {
      userProgress = await UserProgress.create({ userId, currentPartId: 1, deathsCount: 1 });
    } else {
      userProgress.deathsCount++;
      await userProgress.save();
    }

    // Check if the death count exceeds the special ending threshold
    if (userProgress.deathsCount > 50) {
      res.json({
        message: "Why? We trusted you.",
        options: [
          { text: "Keep doing this", action: "closeAndDelete" },
          { text: "Don't do anything at all", action: "returnHomeAndDelete" },
        ],
      });
    } else {
      res.send('Death recorded');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Function to save the current game progress
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

// Function to load the current game progress
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

// Function to delete the current game progress
const deleteGameProgress = async (req, res) => {
  const userId = req.user.id;

  try {
    await UserProgress.destroy({ where: { userId } });
    res.json({ message: 'Progress deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting progress.', error });
  }
};

module.exports = { getGamePart, recordDeath, saveGameProgress, loadGameProgress, deleteGameProgress };
