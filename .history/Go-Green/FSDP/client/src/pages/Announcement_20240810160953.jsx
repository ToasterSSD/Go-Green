import React from "react";
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
  const imageUrl = feature.imageFile
    ? `${import.meta.env.VITE_FILE_BASE_URL}${feature.imageFile}`
    : "/uploads/placeholder.jpg"; // Use placeholder image if no imageFile

  return (
    <Grid item xs={12}>
      <Card sx={{ display: "flex", mb: 3 }}>
        <CardMedia
          component="img"
          sx={{ width: 250, objectFit: "cover" }}
          image={imageUrl}
          alt={feature.title}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            minWidth: 0, // Important for text wrapping
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
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                wordBreak: "break-word", // Ensures text breaks at appropriate points
                flexGrow: 1, // Make title take up available space
                mr: 2, // Margin to give space between text and icon
              }}
            >
              {feature.title}
            </Typography>
            {user?.roles.includes("ADMIN") && (
              <Link to={`/edit-home/${feature.id}`}>
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
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              wordBreak: "break-word", // Ensures text breaks at appropriate points
              flexGrow: 1, // Make description take up available space
              mr: 2, // Margin to give space between text and icon
            }}
          >
            {feature.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mt: 2, // Margin top for spacing
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
