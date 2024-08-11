import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import http from "../http";
import HeaderWithBackground from "../components/HeaderWithBackground";

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
      { text: "Stay in the tree", nextPartId: 99 },
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
]

function GamePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProgress(); // Load progress when component mounts
  }, []);

  const currentPart = storyParts[currentIndex];

  const handleChoice = (choice) => {
    if (choice.nextPartId) {
      const nextPartIndex = storyParts.findIndex(part => part.id === choice.nextPartId);
      if (nextPartIndex !== -1) {
        setCurrentIndex(nextPartIndex);
        setChatHistory([
          ...chatHistory,
          { sender: "player", text: choice.text },
          { sender: "ai", text: storyParts[nextPartIndex].text }
        ]);
      }
    } else if (choice.action === "goBack") {
      // Implement goBack functionality here
    } else if (choice.action === "restart") {
      resetGame();
    } else if (choice.action === "delete") {
      deleteSave();
    }
  };

  const saveProgress = () => {
    const gameData = {
      currentPartId: storyParts[currentIndex].id,
      playerResponses: chatHistory,
    };
    http.post("/api/game/saveGameProgress", gameData).then((res) => {
      console.log("Game progress saved:", res.data);
    }).catch((err) => {
      console.error("Failed to save game progress:", err);
    });
  };

  const loadProgress = () => {
    http.get("/api/game/loadGameProgress").then((res) => {
      const savedGame = res.data;
      if (savedGame) {
        const savedPartIndex = storyParts.findIndex(part => part.id === savedGame.currentPartId);
        if (savedPartIndex !== -1) {
          setCurrentIndex(savedPartIndex);
          setChatHistory(savedGame.playerResponses || []);
        }
      }
      setIsLoading(false);
    }).catch((err) => {
      console.error("Failed to load game progress:", err);
      setIsLoading(false);
    });
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setChatHistory([]);
    setIsLoading(false);
  };

  const deleteSave = () => {
    http.delete("/api/game/deleteGameProgress").then((res) => {
      console.log("Game progress deleted:", res.data);
      resetGame();
    }).catch((err) => {
      console.error("Failed to delete game progress:", err);
    });
  };

  if (isLoading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Box>
      <HeaderWithBackground title="The Enchanted Forest" backgroundImage="/uploads/test.jpg" />
      <Typography variant="h5" sx={{ my: 2 }}>
        The Enchanted Forest
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {currentPart.text}
              </Typography>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                {currentPart.options.map((option, index) => (
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
        <Button variant="outlined" onClick={saveProgress}>Save Game</Button>
        <Button variant="outlined" onClick={loadProgress}>Load Game</Button>
      </Box>
    </Box>
  );
}

export default GamePage;
