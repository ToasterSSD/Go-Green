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
import global from "../global";
import http from "../http";

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
            {isExpanded ? (
              <div dangerouslySetInnerHTML={{ __html: announcement.content }} />
            ) : (
              (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${announcement.content?.substring(0, 500)}${
                      announcement.content?.length
