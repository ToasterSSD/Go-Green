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

function FeedbackAdmin() {
  const [feedbackAdminList, setFeedbackAdminList] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);

  const getFeedbackAdmin = () => {
    http.get("/feedback").then((res) => {
      setFeedbackAdminList(res.data);
    });
  };

  useEffect(() => {
    getFeedbackAdmin();
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Feedback Detail
      </Typography>

      <Grid container spacing={2}>
        {feedbackAdminList.map((feedbackAdmin, i) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={feedbackAdmin.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", mb: 1 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {feedbackAdmin.title}
                    </Typography>
                    {user && user.id === feedbackAdmin.userId && (
                      <Link to={`/editfeedbackDetail/${feedbackAdmin.id}`}>
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
                    <Typography>{feedbackAdmin.user?.name}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    color="text.secondary"
                  >
                    <AccessTime sx={{ mr: 1 }} />
                    <Typography>
                      {dayjs(feedbackAdmin.createdAt).format(
                        global.datetimeFormat
                      )}
                    </Typography>
                  </Box>
                  <Typography sx={{ whiteSpace: "pre-wrap" }}>
                    {feedbackAdmin.content}
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

export default FeedbackAdmin;          	    