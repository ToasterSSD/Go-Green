import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import http from "../http";
import dayjs from "dayjs";
import UserContext from "../contexts/UserContext";
import global from "../global";

function More_Announcement() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    http.get(`/announcement/${id}`).then((res) => {
      setAnnouncement(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Card>
        {announcement.imageFile && (
          <Box className="aspect-ratio-container">
            <img
              alt="announcement"
              src={`${import.meta.env.VITE_FILE_BASE_URL}${
                announcement.imageFile
              }`}
            />
          </Box>
        )}
        <CardContent>
          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              {announcement.title || "No Title"}
            </Typography>
            {(user?.roles?.includes("ADMIN") ||
              user?.id === announcement.userId) && (
              <Link to={`/editannouncement/${announcement.id}`}>
                <Button color="primary" variant="contained">
                  Edit
                </Button>
              </Link>
            )}
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
            color="text.secondary"
          >
            <Typography>{announcement.user?.name || "Unknown User"}</Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
            color="text.secondary"
          >
            <Typography>
              {announcement.createdAt
                ? dayjs(announcement.createdAt).format(global.datetimeFormat)
                : "Unknown Date"}
            </Typography>
          </Box>
          <Typography component="div" sx={{ whiteSpace: "pre-wrap", pb: 2 }}>
            <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
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
    </Box>
  );
}

export default More_Announcement;
