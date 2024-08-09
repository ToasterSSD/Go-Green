import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HeaderWithBackground from "../components/HeaderWithBackground"; // Adjust the import path as needed
import http from "../http";

function Home() {
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the homepage from the backend
    http
      .get("/homepage")
      .then((response) => {
        console.log("Fetched homepage:", response.data); // Log the fetched data
        setFeatures(response.data);
      })
      .catch((error) => {
        console.error("Error fetching homepage:", error);
        setError("Failed to fetch homepage. Please try again later.");
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
      <Box sx={{ mt: 5 }}>
        {error ? (
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        ) : (
          features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#e7e7e7",
                p: 5,
                mb: 2,
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                width: "100%",
              }}
            >
              <img
                src={feature.image || "/uploads/placeholder.jpg"} // Use the placeholder image if not provided
                alt={feature.title}
                style={{ height: "150px", marginRight: "30px" }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4">{feature.title}</Typography>
                <Typography variant="body1" sx={{ fontSize: "1.2em" }}>
                  {feature.description}
                </Typography>
                <Link to={feature.link} style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    {feature.buttonText || "Learn More"}
                  </Button>
                </Link>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

export default Home;
