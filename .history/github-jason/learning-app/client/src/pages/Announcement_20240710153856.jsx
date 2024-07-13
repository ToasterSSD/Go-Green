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
      <Typography variant="h5" sx={{ my: 2 }}>
        Announcement
      </Typography>

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
        <Link to="/addannouncement" style={{ textDecoration: "none" }}>
          <Button variant="contained">Add</Button>
        </Link>
      </Box>
      <Grid container spacing={2}>
        {announcementList.map((announcement) => (
          <Grid item xs={12} md={6} lg={4} key={announcement.id}>
            <Card>
              {announcement.imageFile && (
                <Box className="aspect-ratio-container">
                  <img
                    alt="announcement"
                    src={`${import.meta.env.VITE_FILE_BASE_URL}${
                      announcement.imageFile
                    }`}
                  ></img>
                </Box>
              )}
              <CardContent>
                <Box sx={{ display: "flex", mb: 1 }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {announcement.title}
                  </Typography>
                  {user && user.id === announcement.userId && (
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
                  <Typography>{announcement.user?.name}</Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  color="text.secondary"
                >
                  <AccessTime sx={{ mr: 1 }} />
                  <Typography>
                    {dayjs(announcement.createdAt).format(
                      global.datetimeFormat
                    )}
                  </Typography>
                </Box>
                <Typography sx={{ whiteSpace: "pre-wrap" }}>
                  {announcement.content}
                </Typography>
                <Typography>
                  {announcement.link && (
                    <a
                      href={announcement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click here to visit the link
                    </a>
                  )}

                  {announcement.link}
                </Typography>
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Announcement;
