import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HeaderWithBackground from "../components/HeaderWithBackground"; // Adjust the import path as needed

function Home() {
  return (
    <Box>
      <HeaderWithBackground
        title="Home Page"
        backgroundImage="/uploads/background.jpg" // Path to your background image
      />

      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Our Application
        </Typography>
        <Typography variant="h6" gutterBottom>
          This is the home page accessible to all users.
        </Typography>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" sx={{ m: 2 }}>
            Register
          </Button>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary" sx={{ m: 2 }}>
            Login
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Home;
