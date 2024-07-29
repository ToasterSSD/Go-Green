import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import HeaderWithBackground from "../components/HeaderWithBackground"; // Adjust the import path as needed

function Home() {
  const features = [
    {
      title: "Newsletter",
      description:
        "Stay informed with our newsletter featuring the latest environmental news, global issues, and community updates.",
      link: "/News",
      image: "/uploads/astolfo.jpg", // Path to your feature image
    },
    {
      title: "Announcements",
      description:
        "Keep up-to-date with our latest announcements. Discover upcoming events and volunteer opportunities to help the environment.",
      link: "/announcement",
      image: "/uploads/astolfo.jpg", // Path to your feature image
    },
    {
      title: "Chat Area",
      description:
        "Engage with like-minded individuals in our chat area. Join discussions, share ideas, and create interest groups on various environmental topics.",
      link: "/chatarea",
      image: "/uploads/astolfo.jpg", // Path to your feature image
    },
    {
      title: "Games",
      description:
        "Engage in our choose your own adventure game to develop your environmental knowledge in a fun and interactive way.",
      link: "/chatarea",
      image: "/uploads/astolfo.jpg", // Path to your feature image
    },
    
    {
      title: "Learn",
      description:
        "Explore educational resources that raise awareness about environmental issues. Engage younger users with fun and informative content on serious global challenges.",
      link: "/Learning",
      image: "/uploads/astolfo.jpg", // Path to your feature image
    },
    {
      title: "Donations",
      description:
        "Make a difference by donating. Join our mission to create a better world and support our cause for positive change.",
      link: "/Donations",
      image: "/uploads/astolfo.jpg", // Path to your feature image
    },
    {
      title: "Feedback",
      description:
        "Share your thoughts and suggestions with our team. We value your feedback and will respond promptly to address any issues or improvements.",
      link: "/Feedback",
      image: "/uploads/astolfo.jpg", // Path to your feature image
    },
  ];

  return (
    <Box>
      <HeaderWithBackground
        title="Home Page"
        backgroundImage="/uploads/green-earth.jpg" // Path to your background image
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
        {features.map((feature, index) => (
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
              src={feature.image}
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
                  Learn More
                </Button>
              </Link>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Home;
