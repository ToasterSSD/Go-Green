import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import UserContext from "../contexts/UserContext";
import HeaderWithBackground from "../components/HeaderWithBackground";
import http from "../http";

function HomeCard({ feature, user }) {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        {feature.imageFile && (
          <Box className="aspect-ratio-container" sx={{ overflow: "hidden" }}>
            <img
              alt="feature"
              src={`${import.meta.env.VITE_FILE_BASE_URL}/${feature.imageFile}`}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
        )}
        <CardContent>
          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {feature.title || "No Title"}
            </Typography>
            {user?.roles?.includes("ADMIN") && (
              <Link to={`/edit-home/${feature.id}`}>
                <IconButton color="primary" sx={{ padding: "4px" }}>
                  <Edit />
                </IconButton>
              </Link>
            )}
          </Box>
          <Typography sx={{ mb: 2 }}>
            {feature.description || "No Description"}
          </Typography>
          <Link
            to={`/${feature.buttonText}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="primary">
              {feature.buttonText || "Learn More"}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
}

function Home() {
  const [features, setFeatures] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Fetch the homepage content from the backend
    http
      .get("/homepage")
      .then((response) => {
        setFeatures(response.data);
      })
      .catch((error) => {
        console.error("Error fetching homepage:", error);
      });
  }, []);

  return (
    <Box>
      <HeaderWithBackground
        title="Home Page"
        backgroundImage="/uploads/homepage.jpg" // Path to your background image
      />

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        {user?.roles?.includes("ADMIN") && (
          <Link
            to="/add-home"
            style={{ textDecoration: "none", marginLeft: "auto" }}
          >
            <Button variant="contained">Add</Button>
          </Link>
        )}
      </Box>

      <Grid container spacing={2}>
        {features.map((feature) => (
          <HomeCard key={feature.id} feature={feature} user={user} />
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
