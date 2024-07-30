import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import { AccountCircle, AccessTime, Edit } from "@mui/icons-material";
import dayjs from "dayjs";
import UserContext from "../contexts/UserContext";
import global from "../global";


function AnnouncementCard({ announcement, user }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSignUpRedirect = () => {
    navigate("/announcement-signup");
  };

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        {announcement.imageFile && (
          <Box className="aspect-ratio-container">
            <img
              alt="announcement"
              src={`${import.meta.env.VITE_FILE_BASE_URL}${
                announcement.imageFile
              }`}
              style={{ width: "100%" }}
            />
          </Box>
        )}
        <CardContent>
          <Box sx={{ display: "flex", mb: 1 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {announcement.title || "No Title"}
            </Typography>
            {(user?.roles?.includes("ADMIN") ||
              user?.id === announcement.userId) && (
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
            <div
              dangerouslySetInnerHTML={{
                __html: isExpanded
                  ? announcement.content
                  : `${announcement.content?.substring(0, 500)}${
                      announcement.content?.length > 500 ? "..." : ""
                    }`,
              }}
            />
          </Typography>
          {announcement.content?.length > 500 && (
            <Button onClick={toggleExpanded}>
              {isExpanded ? "Show Less" : "Read More"}
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignUpRedirect}
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

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
        backgroundImage="/uploads/test.jpg" // Path to your background image
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

export default Announcement;
