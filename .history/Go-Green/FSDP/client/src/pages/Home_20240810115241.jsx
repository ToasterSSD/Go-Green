import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HeaderWithBackground from "../components/HeaderWithBackground"; // Adjust the import path as needed
import http from "../http";
import UserContext from "../contexts/UserContext";

function Home() {
  const [features, setFeatures] = useState([]);
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Fetch the homepage content from the backend
    http
      .get("/homepage")
      .then((response) => {
        console.log("Fetched homepage:", response.data); // Log the fetched data
        setFeatures(response.data);
        setFilteredFeatures(response.data);
      })
      .catch((error) => {
        console.error("Error fetching homepage:", error);
        setError("Failed to fetch homepage. Please try again later.");
      });
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = features.filter(
      (feature) =>
        feature.title.toLowerCase().includes(searchValue) ||
        feature.description.toLowerCase().includes(searchValue)
    );
    setFilteredFeatures(filtered);
  };

  const formatButtonTextToPath = (text) => {
    // Replace spaces and special characters with URL-friendly dashes
    return text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
  };

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

      <Box sx={{ textAlign: "center", my: 4 }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ mt: 5 }}>
        {error ? (
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        ) : (
          filteredFeatures.map((feature, index) => (
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
              {feature.imageFile && (
                <Box className="aspect-ratio-container">
                  <img
                    alt="feature"
                    src={`${import.meta.env.VITE_FILE_BASE_URL}uploads/${
                      feature.imageFile
                    }`}
                    onError={(e) => {
                      e.target.onerror = null; // prevents looping if fallback fails
                      e.target.src = "/uploads/placeholder.jpg"; // set fallback image
                    }}
                    style={{ height: "150px", marginRight: "30px" }}
                  />
                </Box>
              
              )}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4">{feature.title}</Typography>
                <Typography variant="body1" sx={{ fontSize: "1.2em" }}>
                  {feature.description}
                </Typography>
                <Link
                  to={`/${formatButtonTextToPath(feature.buttonText)}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    {feature.buttonText || "Learn More"}
                  </Button>
                </Link>
                {user?.roles.includes("ADMIN") && (
                  <Link
                    to={`/edit-home/${feature.id}`}
                    style={{ marginLeft: "10px", textDecoration: "none" }}
                  >
                    <Button variant="outlined" color="secondary">
                      Edit
                    </Button>
                  </Link>
                )}
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

export default Home;
