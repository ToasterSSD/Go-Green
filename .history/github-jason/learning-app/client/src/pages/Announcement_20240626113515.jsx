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

  useEffect(() => {
    getAnnouncements();
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Announcement
      </Typography>

      <Grid container spacing={2}>
        {announcementList.map((announcement, i) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={announcement.id}>
              <Card>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Input
                      value={search}
                      placeholder="Search"
                      onChange={onSearchChange}
                    />
                    <IconButton color="primary">
                      <Search />
                    </IconButton>
                    <IconButton color="primary">
                      <Clear />
                    </IconButton>
                  </Box>
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
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Announcement;
