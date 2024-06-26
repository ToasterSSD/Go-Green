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


function ChatArea() {
  const [chatareaList, setChatAreaList] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);

  const getChatAreas = () => {
    http.get("/chatarea").then((res) => {
      setChatAreaList(res.data);
    });
  };

  useEffect(() => {
    getChatAreas();
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        ChatArea
      </Typography>

      <Grid container spacing={2}>
        {chatareaList.map((chatarea, i) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={chatarea.id}>
              <Card>
                
                <CardContent>
                  <Box sx={{ display: "flex", mb: 1 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {chatarea.title}
                    </Typography>
                    {user && user.id === chatarea.userId && (
                      <Link to={`/editchatarea/${chatarea.id}`}>
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
                    <Typography>{chatarea.user?.name}</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mb: 1 }}
                    color="text.secondary"
                  >
                    <AccessTime sx={{ mr: 1 }} />
                    <Typography>
                      {dayjs(chatarea.createdAt).format(
                        global.datetimeFormat
                      )}
                    </Typography>
                  </Box>
                  <Typography sx={{ whiteSpace: "pre-wrap" }}>
                    {chatarea.content}
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



export default ChatArea;