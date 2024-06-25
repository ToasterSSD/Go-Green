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
    const [search, setSearch] = useState('');
    const { user } = useContext(UserContext);

    const getAnnouncements = () => {
      http.get("/announcement").then((res) => {
        setAnnouncementList(res.data);
      });
    };

    useEffect(() => {
      getAnnouncements();
    }, []);

    <Grid container spacing={2}>
      {tutorialList.map((tutorial, i) => {
        return (
          <Grid item xs={12} md={6} lg={4} key={tutorial.id}>
            <Card>
              {tutorial.imageFile && (
                <Box className="aspect-ratio-container">
                  <img
                    alt="tutorial"
                    src={`${import.meta.env.VITE_FILE_BASE_URL}${
                      tutorial.imageFile
                    }`}
                  ></img>
                </Box>
              )}
              <CardContent>
                <Box sx={{ display: "flex", mb: 1 }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {tutorial.title}
                  </Typography>
                  {user && user.id === tutorial.userId && (
                    <Link to={`/edittutorial/${tutorial.id}`}>
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
                  <Typography>{tutorial.user?.name}</Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                  color="text.secondary"
                >
                  <AccessTime sx={{ mr: 1 }} />
                  <Typography>
                    {dayjs(tutorial.createdAt).format(global.datetimeFormat)}
                  </Typography>
                </Box>
                <Typography sx={{ whiteSpace: "pre-wrap" }}>
                  {tutorial.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>;
}