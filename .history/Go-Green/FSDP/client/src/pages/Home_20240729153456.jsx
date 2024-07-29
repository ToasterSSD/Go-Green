import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HeaderWithBackground from "../components/HeaderWithBackground"; // Adjust the import path as needed

function Home() {
  return (
    <Box>
      <HeaderWithBackground
        title="Home Page"
        backgroundImage="/uploads/green-earth.jpg" // Path to your background image
      />
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h3" gutterBottom>
          About Go Green
        </Typography>
        <Typography variant="h6" gutterBottom>
          Welcome to Go Green! Our mission is to educate and spread awareness
          about the critical need for sustainable waste management. Our web app
          offers a variety of features designed to inform, engage, and motivate
          individuals to take proactive steps towards better waste management
          practices. Through tutorials, news, forums, and interactive areas, we
          aim to empower our community to make environmentally conscious
          decisions and contribute to a greener, healthier planet. Join us in
          our journey to make a lasting impact on waste management and
          environmental sustainability.
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
