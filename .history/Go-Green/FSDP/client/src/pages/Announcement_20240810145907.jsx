import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Input,
  Button,
} from "@mui/material";
import { Edit, Search, Clear } from "@mui/icons-material";
import UserContext from "../contexts/UserContext";
import HeaderWithBackground from "../components/HeaderWithBackground";
import http from "../http";

function HomeContentCard({ content, user }) {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        {content.imageFile && (
          <Box className="aspect-ratio-container">
            <img
              alt="home-content"
              src={`${import.meta.env.VITE_FILE_BASE_URL}${content.imageFile}`}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        )}
        <CardContent>
          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {content.title || "No Title"}
            </Typography>
            {user?.roles?.includes("ADMIN") && (
              <Link to={`/edit-home/${content.id}`}>
                <IconButton color="primary" sx={{ padding: "4px" }}>
                  <Edit />
                </IconButton>
              </Link>
            )}
          </Box>
          <Typography variant="body2">{content.description}</Typography>
          <Box sx={{ mt: 2 }}>
            <Link
              to={`/${content.buttonText.toLowerCase()}`}
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained" color="primary">
                {content.buttonText || "Learn More"}
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

function Home() {
  const [homeContentList, setHomeContentList] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getHomeContent = () => {
    http.get("/homepage").then((res) => {
      setHomeContentList(res.data);
    });
  };

  const searchHomeContent = () => {
    http.get(`/homepage?search=${search}`).then((res) => {
      setHomeContentList(res.data);
    });
  };

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchHomeContent();
    }
  };

  const onClickSearch = () => {
    searchHomeContent();
  };

  const onClickClear = () => {
    setSearch("");
    getHomeContent();
  };

  useEffect(() => {
    getHomeContent();
  }, []);

  return (
    <Box>
      <HeaderWithBackground
        title="Home Page"
        backgroundImage="/uploads/homepage.jpg"
      />

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Input
          value={search}
          placeholder="Search"
          onChange={onSearchChange}
          onKeyDown={onSearchKeyDown}
        />
        <IconButton color="primary" onClick={onClickSearch}>
          <Search />
        </IconButton>
        <IconButton color="primary" onClick={onClickClear}>
          <Clear />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        {user?.roles?.includes("ADMIN") && (
          <Link to="/add-home" style={{ textDecoration: "none" }}>
            <Button variant="contained">Add</Button>
          </Link>
        )}
      </Box>

      <Grid container spacing={2}>
        {homeContentList.map((content) => (
          <HomeContentCard key={content.id} content={content} user={user} />
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
