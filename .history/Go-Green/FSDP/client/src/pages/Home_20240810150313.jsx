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
import {
  AccountCircle,
  AccessTime,
  Search,
  Clear,
  Edit,
} from "@mui/icons-material";
import dayjs from "dayjs";
import UserContext from "../contexts/UserContext";
import HeaderWithBackground from "../components/HeaderWithBackground";
import http from "../http";

function HomeCard({ homeContent, user }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        {homeContent.imageFile && (
          <Box className="aspect-ratio-container">
            <img
              alt="home-content"
              src={`http://localhost:3001/uploads/${homeContent.imageFile}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/uploads/placeholder.jpg";
              }}
              style={{
                display: "block",
                maxWidth: "100%",
                height: "auto",
                marginRight: "30px",
              }}
            />
          </Box>
        )}
        <CardContent>
          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {homeContent.title || "No Title"}
            </Typography>
            {user?.roles?.includes("ADMIN") && (
              <Link to={`/edit-home/${homeContent.id}`}>
                <IconButton color="primary" sx={{ padding: "4px" }}>
                  <Edit />
                </IconButton>
              </Link>
            )}
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
            color="text.secondary"
          >
            <AccountCircle sx={{ mr: 1 }} />
            <Typography>{homeContent.user?.name || "Unknown User"}</Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
            color="text.secondary"
          >
            <AccessTime sx={{ mr: 1 }} />
            <Typography>
              {homeContent.createdAt
                ? dayjs(homeContent.createdAt).format("YYYY-MM-DD HH:mm:ss")
                : "Unknown Date"}
            </Typography>
          </Box>
          <Typography sx={{ whiteSpace: "pre-wrap", pb: 2 }}>
            {isExpanded ? (
              <div
                dangerouslySetInnerHTML={{ __html: homeContent.description }}
              />
            ) : (
              (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${homeContent.description?.substring(0, 500)}${
                      homeContent.description?.length > 500 ? "..." : ""
                    }`,
                  }}
                />
              ) || "No Description"
            )}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button
              component={Link}
              to={`/${homeContent.buttonText}`}
              variant="contained"
              color="primary"
              sx={{ mb: 2 }}
            >
              {homeContent.buttonText || "Learn More"}
            </Button>
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
        {homeContentList.map((homeContent) => (
          <HomeCard
            key={homeContent.id}
            homeContent={homeContent}
            user={user}
          />
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
