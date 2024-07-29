import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import HeaderWithBackground from "../components/HeaderWithBackground"; // Adjust the import path as needed

function Home() {
  const features = [
    {
      title: "Newsletter",
      description:
        "Pass the tours section for various groups to the different areas of town that demonstrate various green practices that usually are not open for public viewing.",
      link: "/News",
      image: "/uploads/tours.png", // Path to your feature image
    },
    {
      title: "Announcements",
      description:
        "Take part in these interactive workshops and hear from inspiring speakers to deepen your knowledge about sustainability.",
      link: "/announcement",
      image: "/uploads/workshops.png", // Path to your feature image
    },
    {
      title: "Chat Area",
      description:
        "Join the green movement. From tree planting to litter picking, there are many opportunities to work together to protect our planet.",
      link: "/chatarea",
      image: "/uploads/initiatives.png", // Path to your feature image
    },
    {
      title: "Learn",
      description:
        "Enjoy eco-friendly shopping, dining, and great green deals.",
      link: "/Learning",
      image: "/uploads/deals.png", // Path to your feature image
    },
    {
      title: "Donations",
      description:
        "Fun for the family at Go Green HQ. Check out the curated list of activities perfect for families to enjoy.",
      link: "/Donations",
      image: "/uploads/family.png", // Path to your feature image
    },
    {
      title: "Feedback",
      description:
        "Pass the tours section for various groups to the different areas of town that demonstrate various green practices that usually are not open for public viewing.",
      link: "/Feedback",
      image: "/uploads/tours.png", // Path to your feature image
    },
    

  return (
    <Box>
      <HeaderWithBackground
        title="Home Page"
        backgroundImage="/uploads/green-earth.jpg" // Path to your background image
      />
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h3" gutterBottom>
          About Go <span style={{ color: "green" }}>Green</span>
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
      <Box sx={{ mt: 5 }}>
        
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  style={{ height: "100px", marginRight: "20px" }}
                />
                <Box>
                  <Typography variant="h5">{feature.title}</Typography>
                  <Typography variant="body1">{feature.description}</Typography>
                  <Link to={feature.link} style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                      Learn More
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
