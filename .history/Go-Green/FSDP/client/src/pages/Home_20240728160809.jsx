
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Input,
  IconButton,
  Button,
} from "@mui/material";
import {
  AccountCircle,
  AccessTime,
  Search,
  Clear,
  Edit,
} from "@mui/icons-material";
import http from "../http";
import dayjs from "dayjs";
import UserContext from "../contexts/UserContext";
import global from "../global";
import HeaderWithBackground from "../components/HeaderWithBackground";

function Home() {
  return (
    <Box>
      <HeaderWithBackground
        title="Announcements"
        backgroundImage="/uploads/test.jpg" // Path to your background image
      />

    </Box>
    
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
  );
}

export default Home;
