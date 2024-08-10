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
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
            minWidth: 0, // Ensures flexbox correctly sizes the content
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
              minWidth: 0, // Prevents layout shift
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
                mr: 2, // Add margin to prevent overlap with the icon
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
              mt: 1,
              mb: 2,
              wordWrap: "break-word", // Forces wrapping on long words
              overflowWrap: "break-word",
              whiteSpace: "normal", // Ensures that text breaks within the container
              flexGrow: 1, // Allows the text to take available space
              maxWidth: "100%", // Prevents overflow
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
