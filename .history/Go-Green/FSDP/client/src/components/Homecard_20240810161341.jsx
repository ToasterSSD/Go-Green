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
            minWidth: 0,
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
                flexGrow: 1,
                whiteSpace: "normal", // Allow text to wrap to the next line
                wordBreak: "break-word", // Break long words if necessary
                overflowWrap: "break-word", // Break text if it's too long for the container
                maxWidth: "calc(100% - 40px)", // Adjust based on the edit icon width
              }}
            >
              {feature.title}
            </Typography>
            {user?.roles.includes("ADMIN") && (
              <Link to={`/edit-home/${feature.id}`}>
                <IconButton
                  color="primary"
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    zIndex: 2,
                  }}
                >
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
              whiteSpace: "normal", // Allow text to wrap to the next line
              wordBreak: "break-word", // Break long words if necessary
              overflowWrap: "break-word", // Break text if it's too long for the container
              lineHeight: "1.5em",
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
