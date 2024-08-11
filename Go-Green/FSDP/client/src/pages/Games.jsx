import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import http from "../http";
import HeaderWithBackground from "../components/HeaderWithBackground";

const storyParts = [
  {
    id: 1,
    text: "You wake up in a strange place. The air is thick, the sky is dark, and ruins surround you. A voice echoes in your mind: 'You must stop this from happening.'",
    options: [
      { text: "Investigate the surroundings", nextPartId: 2 },
      { text: "Try to remember how you got here", nextPartId: 3 },
      { text: "Walk toward the distant city", nextPartId: 4 },
    ],
  },
  {
    id: 2,
    text: "You find remnants of a once-thriving world, now reduced to rubble. A strange device catches your eye, glowing faintly.",
    options: [
      { text: "Pick up the device", nextPartId: 5 },
      { text: "Leave it alone", nextPartId: 6 },
      { text: "Search for other survivors", nextPartId: 7 },
    ],
  },
  {
    id: 3,
    text: "Flashes of memories flood your mind. You were sent from the future, from a world on the brink of collapse, to change the course of history.",
    options: [
      { text: "Focus on the mission", nextPartId: 8 },
      { text: "Panic and run", nextPartId: 9 },
      { text: "Sit and wait", nextPartId: 10 },
    ],
  },
  {
    id: 4,
    text: "The city looms ahead, a hollow shell of what it once was. A broken sign reads 'New York.'",
    options: [
      { text: "Enter the city", nextPartId: 11 },
      { text: "Look for an alternative route", nextPartId: 12 },
      { text: "Turn back", nextPartId: 13 },
    ],
  },
  {
    id: 5,
    text: "The device hums in your hand. A holographic map appears, showing points in time where critical decisions were made.",
    options: [
      { text: "Choose a point in time to travel to", nextPartId: 14 },
      { text: "Ignore the device", nextPartId: 15 },
    ],
  },
  {
    id: 6,
    text: "You decide not to touch the device, but a sharp pain shoots through your head. The voice urges: 'Use it.'",
    options: [
      { text: "Reluctantly pick up the device", nextPartId: 5 },
      { text: "Ignore the voice", nextPartId: 16 },
    ],
  },
  {
    id: 7,
    text: "You search the ruins but find no one. The world is eerily silent, save for the wind howling through the wreckage.",
    options: [
      { text: "Keep searching", nextPartId: 17 },
      { text: "Return to the device", nextPartId: 5 },
    ],
  },
  {
    id: 8,
    text: "You steel yourself. You have one chance to prevent this catastrophe. The voice in your head guides you: 'Find the device.'",
    options: [
      { text: "Search for the device", nextPartId: 5 },
      { text: "Ignore the voice", nextPartId: 16 },
    ],
  },
  {
    id: 9,
    text: "You run aimlessly through the ruins, but there's no escape. The world is dead.",
    options: [
      { text: "Keep running", nextPartId: 18 },
      { text: "Stop and collect yourself", nextPartId: 19 },
    ],
  },
  {
    id: 10,
    text: "You sit and wait, but nothing changes. The voice in your head grows louder, more insistent.",
    options: [
      { text: "Get up and act", nextPartId: 8 },
      { text: "Continue to wait", nextPartId: 20 },
    ],
  },
  {
    id: 11,
    text: "The city is a wasteland. Broken buildings, dried-up rivers, and smog fill the air. In the distance, you see a faint light.",
    options: [
      { text: "Head toward the light", nextPartId: 21 },
      { text: "Search the city", nextPartId: 22 },
      { text: "Leave the city", nextPartId: 23 },
    ],
  },
  {
    id: 12,
    text: "You find a narrow path leading away from the city, toward a lush forest that seems out of place.",
    options: [
      { text: "Enter the forest", nextPartId: 24 },
      { text: "Turn back", nextPartId: 13 },
    ],
  },
  {
    id: 13,
    text: "You decide to turn back, but the path behind you has disappeared. You're trapped.",
    options: [
      { text: "Panic", nextPartId: 9 },
      { text: "Look for another way", nextPartId: 25 },
    ],
  },
  {
    id: 14,
    text: "You select a time on the device. The world around you blurs, and you find yourself in the past, at a crucial moment in history.",
    options: [
      { text: "Stop a major polluter", nextPartId: 26 },
      { text: "Influence a key decision-maker", nextPartId: 27 },
      { text: "Educate the public about environmental issues", nextPartId: 28 },
    ],
  },
  {
    id: 15,
    text: "You ignore the device, but the world starts to crumble around you. The voice screams: 'You must act!'",
    options: [
      { text: "Pick up the device", nextPartId: 5 },
      { text: "Refuse to act", nextPartId: 29 },
    ],
  },
  {
    id: 16,
    text: "The world collapses as you refuse to act. The future is lost.",
    options: [
      { text: "Go back to the last choice", action: "goBack" },
      { text: "Restart the game", action: "restart" },
    ],
  },
  {
    id: 17,
    text: "You find an old man, barely alive. He whispers, 'It's too late,' and hands you a small key.",
    options: [
      { text: "Take the key and ask about it", nextPartId: 30 },
      { text: "Ignore him and keep searching", nextPartId: 31 },
    ],
  },
  {
    id: 18,
    text: "You keep running, but the ground crumbles beneath you, and you fall into darkness.",
    options: [
      { text: "Go back to the last choice", action: "goBack" },
      { text: "Restart the game", action: "restart" },
    ],
  },
  {
    id: 19,
    text: "You stop and take deep breaths. The voice guides you to a hidden bunker nearby.",
    options: [
      { text: "Enter the bunker", nextPartId: 32 },
      { text: "Ignore the voice", nextPartId: 16 },
    ],
  },
  {
    id: 20,
    text: "As you wait, the world grows darker and colder. The end is near.",
    options: [
      { text: "Go back to the last choice", action: "goBack" },
      { text: "Restart the game", action: "restart" },
    ],
  },
  {
    id: 21,
    text: "The light leads you to a hidden laboratory, where you find a scientist working on a solution.",
    options: [
      { text: "Help the scientist", nextPartId: 33 },
      { text: "Sabotage the project", nextPartId: 34 },
    ],
  },
  {
    id: 22,
    text: "You search the city and find remnants of protests against environmental destruction.",
    options: [
      { text: "Join the protests", nextPartId: 35 },
      { text: "Ignore the signs", nextPartId: 36 },
    ],
  },
  {
    id: 23,
    text: "As you leave the city, you realize there’s nothing left. The world is beyond saving.",
    options: [
      { text: "Give up", nextPartId: 37 },
      { text: "Search for a miracle", nextPartId: 38 },
    ],
  },
  {
    id: 24,
    text: "The forest is untouched by the devastation. It seems to be a sanctuary, but something feels off.",
    options: [
      { text: "Explore deeper", nextPartId: 39 },
      { text: "Turn back", nextPartId: 13 },
    ],
  },
  {
    id: 25,
    text: "You find a small opening in the rubble. It leads to an underground facility.",
    options: [
      { text: "Enter the facility", nextPartId: 40 },
      { text: "Turn back", nextPartId: 13 },
    ],
  },
  {
    id: 26,
    text: "You confront the CEO of a major polluting company. Your words could change the future.",
    options: [
      { text: "Persuade them to change", nextPartId: 100 }, // Good Ending
      { text: "Fail to convince them", nextPartId: 101 }, // Neutral Ending
    ],
  },
  {
    id: 27,
    text: "You find yourself in a room with a world leader. You have a chance to influence their decision.",
    options: [
      { text: "Make a compelling argument", nextPartId: 100 }, // Good Ending
      { text: "Fail to make an impact", nextPartId: 102 }, // Bad Ending
    ],
  },
  {
    id: 28,
    text: "You organize a movement to educate the public about the dangers of environmental neglect.",
    options: [
      { text: "Succeed in spreading awareness", nextPartId: 100 }, // Good Ending
      { text: "Fail to gain traction", nextPartId: 101 }, // Neutral Ending
    ],
  },
  {
    id: 29,
    text: "The world crumbles around you. You had the chance to change things, but did nothing.",
    options: [
      { text: "Go back to the last choice", action: "goBack" },
      { text: "Restart the game", action: "restart" },
    ],
  },
  {
    id: 30,
    text: "The old man tells you that the key unlocks a vault containing humanity's last hope.",
    options: [
      { text: "Search for the vault", nextPartId: 41 },
      { text: "Leave the man", nextPartId: 31 },
    ],
  },
  {
    id: 31,
    text: "You continue searching but find nothing. The world is empty.",
    options: [
      { text: "Go back to the old man", nextPartId: 30 },
      { text: "Give up", nextPartId: 37 },
    ],
  },
  {
    id: 32,
    text: "The bunker is filled with technology from a lost era. You find a way to reverse the environmental damage.",
    options: [
      { text: "Activate the machines", nextPartId: 100 }, // Good Ending
      { text: "Destroy the machines", nextPartId: 102 }, // Bad Ending
    ],
  },
  {
    id: 33,
    text: "You and the scientist work together and find a way to save the world.",
    options: [
      { text: "Complete the project", nextPartId: 100 }, // Good Ending
      { text: "Abandon the project", nextPartId: 101 }, // Neutral Ending
    ],
  },
  {
    id: 34,
    text: "You sabotage the project, but the scientist discovers your actions. The future is in jeopardy.",
    options: [
      { text: "Try to fix your mistake", nextPartId: 33 },
      { text: "Let the project fail", nextPartId: 102 }, // Bad Ending
    ],
  },
  {
    id: 35,
    text: "You join the protests, raising awareness and rallying support.",
    options: [
      { text: "Lead the movement", nextPartId: 100 }, // Good Ending
      { text: "Let others take charge", nextPartId: 101 }, // Neutral Ending
    ],
  },
  {
    id: 36,
    text: "You ignore the signs, and the protests fade away. The future is uncertain.",
    options: [
      { text: "Try to restart the movement", nextPartId: 35 },
      { text: "Give up", nextPartId: 102 }, // Bad Ending
    ],
  },
  {
    id: 37,
    text: "You give up. The world around you collapses.",
    options: [
      { text: "Go back to the last choice", action: "goBack" },
      { text: "Restart the game", action: "restart" },
    ],
  },
  {
    id: 38,
    text: "You search desperately for a miracle but find none. The world is lost.",
    options: [
      { text: "Go back to the last choice", action: "goBack" },
      { text: "Restart the game", action: "restart" },
    ],
  },
  {
    id: 39,
    text: "Deeper in the forest, you find a hidden civilization living in harmony with nature.",
    options: [
      { text: "Learn their ways", nextPartId: 100 }, // Good Ending
      { text: "Reject their ways", nextPartId: 101 }, // Neutral Ending
    ],
  },
  {
    id: 40,
    text: "The facility contains records of humanity's decline. You find a way to change history.",
    options: [
      { text: "Use the knowledge", nextPartId: 100 }, // Good Ending
      { text: "Ignore the knowledge", nextPartId: 102 }, // Bad Ending
    ],
  },
  {
    id: 41,
    text: "You find the vault. Inside, there’s a device that can reverse the environmental damage.",
    options: [
      { text: "Use the device", nextPartId: 100 }, // Good Ending
      { text: "Destroy the device", nextPartId: 102 }, // Bad Ending
    ],
  },
  {
    id: 100,
    text: "Congratulations, you've reached the good ending! You manage to change the course of history, preventing the environmental collapse and saving the future.",
    options: [
      { text: "Restart", action: "restart" },
      { text: "Delete Save", action: "delete" },
    ],
  },
  {
    id: 101,
    text: "You've reached the neutral ending. Your efforts prevent the worst, but the future remains uncertain. Some crises are averted, but the world still suffers.",
    options: [
      { text: "Restart", action: "restart" },
      { text: "Delete Save", action: "delete" },
    ],
  },
  {
    id: 102,
    text: "You've reached the bad ending. You fail to prevent the environmental collapse. The world is doomed, and the future is bleak.",
    options: [
      { text: "Restart", action: "restart" },
      { text: "Delete Save", action: "delete" },
    ],
  },
  {
    id: 103,
    text: "Why? We trusted you. The future is lost.",
    options: [
      { text: "Keep doing this", action: "crash" },
      { text: "Don't do anything at all", action: "restart" },
    ],
  },
];

function GamePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deathCount, setDeathCount] = useState(0);
  const [lastSafeIndex, setLastSafeIndex] = useState(0); // To store the last safe choice before death

  const currentPart = storyParts[currentIndex]; // Get the current story part

  const handleChoice = (choice) => {
    console.log("Handling choice:", choice.text);

    if (choice.nextPartId) {
      const nextPartIndex = storyParts.findIndex(part => part.id === choice.nextPartId);
      if (nextPartIndex !== -1) {
        if (choice.action !== "die") {
          setLastSafeIndex(currentIndex); // Update last safe point only if the choice doesn't lead to death
        }
        setCurrentIndex(nextPartIndex);
        setChatHistory([...chatHistory, { sender: "player", text: choice.text }, { sender: "ai", text: storyParts[nextPartIndex].text }]);
      }
    } else if (choice.action === "goBack") {
      handleDeath();
    } else if (choice.action === "restart") {
      resetGame();
    } else if (choice.action === "delete") {
      deleteSave();
    } else if (choice.action === "closeAndDelete") {
    closeAndDelete();
  } else if (choice.action === "returnHomeAndDelete") {
    returnHomeAndDelete();
  }
};



  const handleDeath = () => {
    setDeathCount(prevCount => {
      const newCount = prevCount + 1;
      console.log("Current Death Count:", newCount);
      if (newCount >= 20) {  // Assuming 5 is the special ending trigger
        goToSpecialEnding();
      } else {
        // Go back to last safe choice
        console.log("Returning to last safe point at index:", lastSafeIndex);
        setCurrentIndex(lastSafeIndex);
      }
      return newCount;
    });
  };

  const goToSpecialEnding = () => {
    console.log("Special ending triggered.");
    const specialEndingIndex = storyParts.findIndex(part => part.id === 103); // Assuming 101 is the special ending ID
    if (specialEndingIndex !== -1) {
      setCurrentIndex(specialEndingIndex);
      setChatHistory([...chatHistory, { sender: "ai", text: storyParts[specialEndingIndex].text }]);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setChatHistory([]);
    setDeathCount(0); // Reset death count on restart
  };

  const closeAndDelete = () => {
    console.log("Closing the application and deleting the progress...");
    // Here you might want to trigger a function that closes the app and deletes the progress.
    // Since this is a web app, "closing the app" could mean navigating to a "goodbye" screen or just clearing the state.
    resetGame();
    process.exit(1);
  };

  const returnHomeAndDelete = () => {
    console.log("Returning to the homepage and deleting the progress...");
    // Here you might navigate back to the homepage and reset the game
    resetGame();
    // Navigate to the homepage if you have one, for example:
    window.location.href = "/";
  };

  return (
    <Box>
      <HeaderWithBackground title="Back to the Future" backgroundImage="/uploads/test.jpg" />
      <Typography variant="h5" sx={{ my: 2 }}>
        Back to the Future
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {currentPart?.text} {/* Ensure currentPart is defined */}
              </Typography>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                {currentPart?.options.map((option, index) => (
                  <Grid item key={index}>
                    <Button variant="contained" onClick={() => handleChoice(option)}>
                      {option.text}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", gap: "8px" }}>
        {currentPart?.id == 101 && ( // Hide Restart button if the current part is the special ending
          <Button variant="outlined" onClick={resetGame}>Restart Game</Button>
        )}
      </Box>
    </Box>
  );
}

export default GamePage;
