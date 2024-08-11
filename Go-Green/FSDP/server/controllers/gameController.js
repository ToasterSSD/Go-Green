const { GamePart } = require('../models');

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

// Function to record a player's death and allow them to return to the last choice
const recordDeath = (req, res) => {
  const { currentPartId, deathCount } = req.body;
  const newDeathCount = deathCount + 1;

  // Check if the death count exceeds a certain threshold for a special ending
  if (newDeathCount > 10) {
    res.json({
      message: "Why? We trusted you.",
      options: [
        { text: "Keep doing this", action: "closeAndDelete" },
        { text: "Don't do anything at all", action: "returnHomeAndDelete" },
      ],
    });
  } else {
    // Send response with the option to return to the last safe point
    res.json({
      currentPartId,
      deathCount: newDeathCount,
      message: "You died. Want to try again?",
      options: [
        { text: "Return to the last choice", action: "goBack" },
        { text: "Start over", action: "restart" },
      ],
    });
  }
};

module.exports = { getGamePart, recordDeath };
