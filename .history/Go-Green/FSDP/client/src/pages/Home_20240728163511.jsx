import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HeaderWithBackground from "../components/HeaderWithBackground"; // Adjust the import path as needed

function Home() {
  return (
    <Box>
      <HeaderWithBackground
        title="Home Page"
        backgroundImage="/uploads/Go-Green logo.jpg" // Path to your background image
      />
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Our Application
        </Typography>
        <Typography variant="h6" gutterBottom>
          This is the home page accessible to all users.
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
