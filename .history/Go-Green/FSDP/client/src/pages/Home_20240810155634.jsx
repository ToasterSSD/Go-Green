import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@mui/material";
import UserContext from "../contexts/UserContext";
import HeaderWithBackground from "../components/HeaderWithBackground";
import http from "../http";
import HomeCard from "../components/HomeCard";

function Home() {
  const [features, setFeatures] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    http.get("/homepage").then((res) => {
      setFeatures(res.data);
    });
  }, []);

  return (
    <Box>
      <HeaderWithBackground
        title="Home Page"
        backgroundImage="/uploads/homepage.jpg" // Path to your background image
      />
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h2" gutterBottom>
          About Go <span style={{ color: "green" }}>Green</span>
        </Typography>
        <Typography variant="h5" gutterBottom>
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
      {user?.roles.includes("ADMIN") && (
        <Box sx={{ textAlign: "right", m: 5 }}>
          <Link to="/add-home" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Add Content
            </Button>
          </Link>
        </Box>
      )}
      <Grid container spacing={4} sx={{ mt: 5 }}>
        {features.map((feature) => (
          <HomeCard key={feature.id} feature={feature} user={user} />
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
