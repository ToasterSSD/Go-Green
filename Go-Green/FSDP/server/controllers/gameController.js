const { GamePart, UserProgress } = require('../models');

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

const recordDeath = async (req, res) => {
  const { userId } = req.params;
  try {
    let userProgress = await UserProgress.findOne({ where: { userId } });
    if (!userProgress) {
      userProgress = await UserProgress.create({ userId, partId: 1, deathsCount: 1 });
    } else {
      userProgress.deathsCount++;
      await userProgress.save();
    }

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

module.exports = { getGamePart, recordDeath };
