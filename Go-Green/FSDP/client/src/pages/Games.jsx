import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import http from "../http";

// Hard-coded story parts
const storyParts = [
  {
    id: 1,
    text: "You wake up in a dense forest. Paths lead in three directions.",
    options: [
      { text: "Explore the forest", nextPartId: 2 },
      { text: "Climb the tree", nextPartId: 3 },
      { text: "Head back home", nextPartId: 4 },
    ],
  },
  {
    id: 2,
    text: "As you venture deeper into the forest, you notice the trees whispering strange secrets.",
    options: [
      { text: "Listen closely", nextPartId: 5 },
      { text: "Run away", nextPartId: 6 },
      { text: "Keep walking", nextPartId: 7 },
    ],
  },
  // Add more story parts here...
  {
    id: 3,
    text: "You climbed the tree and got a better view of the forest.",
    options: [
      { text: "Go down and explore", nextPartId: 2 },
      { text: "Stay in the tree", nextPartId: 4 },
    ],
  },
  {
    id: 99,
    text: "You died. Want to try again?",
    options: [
      { text: "Go back to the last safe point", action: "goBack" },
      { text: "Start over", action: "restart" },
    ],
  },
  {
    id: 100,
    text: "Congratulations, you've reached the end of the game!",
    options: [
      { text: "Restart", action: "restart" },
      { text: "Delete Save", action: "delete" },
    ],
  },
];

function GamePage() {
  const [currentIndex, setCurrentIndex] = useState(0); // Initialize to 0 for a clean start
  const [chatHistory, setChatHistory] = useState([]); // Store the chat history
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    loadProgress(); // Automatically load progress when the component mounts
  }, []);

  useEffect(() => {
    if (!isLoading && chatHistory.length === 0) {
      const currentPart = storyParts[currentIndex];
      addAIResponse(currentPart.text);
    }
  }, [currentIndex, isLoading]);

  const addAIResponse = (text) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: "ai", text },
    ]);
  };

  const addPlayerResponse = (text) => {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: "player", text },
    ]);
  };

  const handleChoice = (choice) => {
    addPlayerResponse(choice.text); // Add the player's choice to the chat

    if (choice.nextPartId) {
      const nextPartIndex = storyParts.findIndex((part) => part.id === choice.nextPartId);
      if (nextPartIndex !== -1) {
        setCurrentIndex(nextPartIndex);
        addAIResponse(storyParts[nextPartIndex].text); // Immediately add the next part's text
      }
    } else if (choice.action === "goBack") {
      const lastSafePointIndex = storyParts.findIndex((part) => part.isSafePoint);
      setCurrentIndex(lastSafePointIndex);
      addAIResponse(storyParts[lastSafePointIndex].text);
    } else if (choice.action === "restart") {
      resetGame();
    } else if (choice.action === "delete") {
      deleteSave();
    } else {
      handleGameEnd();
    }
  };

  const saveProgress = () => {
    const gameData = {
      currentPartId: storyParts[currentIndex].id,  // Save the current part ID
      playerResponses: chatHistory,  // Save the player's responses
      deathCount: 0  // Adjust based on your game's logic (e.g., increment this on player death)
    };

    console.log("Saving the following game data:", gameData);

    http.post("/api/game/saveGameProgress", gameData)
      .then((res) => {
        console.log("Game progress saved:", res.data);
      })
      .catch((err) => {
        console.error("Failed to save game progress:", err);
      });
  };

  const loadProgress = () => {
    http.get("/api/game/loadGameProgress")
      .then((res) => {
        const savedGame = res.data;
        console.log("Loaded game data:", savedGame);

        if (savedGame) {
          const savedPartIndex = storyParts.findIndex(
            (part) => part.id === savedGame.currentPartId
          );

          if (savedPartIndex !== -1) {
            console.log("Loaded part index:", savedPartIndex);
            console.log("Loaded chat history:", savedGame.playerResponses);

            setCurrentIndex(savedPartIndex);
            setChatHistory(savedGame.playerResponses || []);
            setIsLoading(false); // Ensure loading state is turned off
          } else {
            console.error("Invalid part ID in saved game data.");
            setCurrentIndex(0);
            setChatHistory([]);
            setIsLoading(false);
          }
        } else {
          console.warn("No saved game found.");
          setCurrentIndex(0); // Start from the beginning if no saved game
          setChatHistory([]);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load game progress:", err);
        setCurrentIndex(0); // Handle loading failure by starting fresh
        setChatHistory([]);
        setIsLoading(false);
      });
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setChatHistory([]);
    setIsLoading(false);
  };

  const deleteSave = () => {
    http.delete("/api/game/deleteGameProgress")
      .then((res) => {
        console.log("Game progress deleted:", res.data);
        resetGame();
      })
      .catch((err) => {
        console.error("Failed to delete game progress:", err);
      });
  };

  if (isLoading) {
    // Show a loading state until the progress is loaded
    return <Typography variant="h5">Loading...</Typography>;
  }

  const currentPart = storyParts[currentIndex]; // Get the current story part

  return (
    <Box sx={{ padding: 3, maxWidth: "600px", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        The Enchanted Forest
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {chatHistory.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: message.sender === "ai" ? "flex-start" : "flex-end",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "12px",
                maxWidth: "80%",
                backgroundColor: message.sender === "ai" ? "#e0f7fa" : "#c8e6c9",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {message.text}
              </Typography>
            </Paper>
          </Box>
        ))}

        {currentPart.options.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "8px", mt: 2 }}>
            {currentPart.options.map((option, index) => (
              <Button key={index} variant="contained" onClick={() => handleChoice(option)}>
                {option.text}
              </Button>
            ))}
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={saveProgress}>
          Save Game
        </Button>
        <Button variant="outlined" onClick={loadProgress} sx={{ ml: 2 }}>
          Load Game
        </Button>
        {(currentIndex === 99 || currentIndex === 100) && (
          <Button variant="outlined" onClick={deleteSave} sx={{ ml: 2 }} color="error">
            Delete Save
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default GamePage;
