import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
} from "@mui/material";
import { Edit, ArrowForward } from "@mui/icons-material";

function HomeCard({ feature, user }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const imageUrl = feature.imageFile
    ? `${import.meta.env.VITE_FILE_BASE_URL}${feature.imageFile}`
    : "/uploads/placeholder.jpg"; // Use placeholder image if no imageFile

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Grid item xs={12}>
      <Card sx={{ display: "flex", mb: 3, position: "relative" }}>
        <CardMedia
          component="img"
          sx={{ width: 250, objectFit: "cover" }}
          image={imageUrl}
          alt={feature.title}
        />
        <CardContent
          sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%", // Ensures content stays within card
            overflow: "hidden", // Ensures no overflow
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "calc(100% - 50px)", // Adjust maxWidth to allow space for the edit icon
              }}
            >
              {feature.title}
            </Typography>
            {user?.roles.includes("ADMIN") && (
              <Link
                to={`/edit-home/${feature.id}`}
                style={{
                  textDecoration: "none",
                  position: "absolute",
                  top: 16,
                  right: 16,
                }}
              >
                <IconButton color="primary">
                  <Edit />
                </IconButton>
              </Link>
            )}
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              mb: 2,
              whiteSpace: "normal",
              wordWrap: "break-word",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: isExpanded ? "none" : 2, // Limit lines when not expanded
            }}
          >
            {feature.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <Button
              component={Link}
              to={`/${feature.buttonText}`}
              variant="contained"
              color="primary"
              endIcon={<ArrowForward />}
            >
              {feature.buttonText || "Learn More"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default HomeCard;
