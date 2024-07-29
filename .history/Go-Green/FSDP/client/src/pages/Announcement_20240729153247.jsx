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
import HeaderWithBackground from "../components/HeaderWithBackground";
import global from "../global";

function Announcement() {
  const [announcementList, setAnnouncementList] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getAnnouncements = () => {
    http.get("/announcement").then((res) => {
      setAnnouncementList(res.data);
    });
  };

  const searchAnnouncement = () => {
    http.get(`/announcement?search=${search}`).then((res) => {
      setAnnouncementList(res.data);
    });
  };

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchAnnouncement();
    }
  };

  const onClickSearch = () => {
    searchAnnouncement();
  };

  const onClickClear = () => {
    setSearch("");
    getAnnouncements();
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <Box>
      <HeaderWithBackground
        title="Announcements"
        backgroundImage="/uploads/home-page
        .jpg" // Path to your background image
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
        {user?.roles.includes("ADMIN") && (
          <Link to="/addannouncement" style={{ textDecoration: "none" }}>
            <Button variant="contained">Add</Button>
          </Link>
        )}
      </Box>
      <Grid container spacing={2}>
        {announcementList.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            user={user}
          />
        ))}
      </Grid>
    </Box>
  );
}

function AnnouncementCard({ announcement, user }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        {announcement.imageFile && (
          <Box className="aspect-ratio-container">
            <img
              alt="announcement"
              src={`${import.meta.env.VITE_FILE_BASE_URL}${announcement.imageFile}`}
            ></img>
          </Box>
        )}
        <CardContent>
          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {announcement.title || "No Title"}
            </Typography>
            {(user?.roles.includes("ADMIN") || user?.id === announcement.userId) && (
              <Link to={`/editannouncement/${announcement.id}`}>
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
            <Typography>{announcement.user?.name || "Unknown User"}</Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
            color="text.secondary"
          >
            <AccessTime sx={{ mr: 1 }} />
            <Typography>
              {announcement.createdAt
                ? dayjs(announcement.createdAt).format(global.datetimeFormat)
                : "Unknown Date"}
            </Typography>
          </Box>
          <Typography sx={{ whiteSpace: "pre-wrap", pb: 2 }}>
            {isExpanded
              ? announcement.content
              : `${announcement.content?.substring(0, 500)}${
                  announcement.content?.length > 500 ? "..." : ""
                }` || "No Content"}
          </Typography>

          {announcement.link && (
            <Typography>
              Link:
              <Box component="span" sx={{ ml: 1 }}>
                <a
                  href={announcement.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {announcement.link}
                </a>
              </Box>
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Announcement;
