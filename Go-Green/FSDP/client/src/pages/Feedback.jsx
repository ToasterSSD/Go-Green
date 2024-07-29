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

function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getFeedback = () => {
    http.get("/feedback").then((res) => {
      setFeedbackList(res.data);
    });
  };
  
  const searchFeedback = () => {
    http.get(`/feedback?search=${search}`).then((res) => {
      setFeedbackList(res.data);
    });
  };
  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchFeedback();
    }
  };
  const onClickSearch = () => {
    searchFeedback();
  };
  const onClickClear = () => {
    setSearch("");
    getFeedback();
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Feedback
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
        <Link to="/addfeedback" style={{ textDecoration: "none" }}>
          <Button variant="contained">Add</Button>
        </Link>
      </Box>
      <Grid container spacing={2}>
        {feedbackList.map((feedback, i) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={feedback.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", mb: 1 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {feedback.title}
                    </Typography>
                    {user && user.id === feedback.userId && (
                      <Link to={`/DeleteFeedback/${feedback.id}`}>
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
                    <Typography>{feedback.user?.name}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    color="text.secondary"
                  >
                    <AccessTime sx={{ mr: 1 }} />
                    <Typography>
                      {dayjs(feedback.createdAt).format(
                        global.datetimeFormat
                      )}
                    </Typography>
                  </Box>
                  <Typography sx={{ whiteSpace: "pre-wrap" }}>
                    {feedback.feedback}
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

export default Feedback;