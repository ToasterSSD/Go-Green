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
        <Grid container sx={{ flex: 1 }}>
          <Grid item xs={11}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
                minWidth: 0,
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  mb: 1,
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  lineHeight: "1.5em",
                  mb: 2,
                }}
              >
                {feature.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
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
          </Grid>
          {user?.roles.includes("ADMIN") && (
            <Grid
              item
              xs={1}
              sx={{ display: "flex", alignItems: "flex-start" }}
            >
              <Link to={`/edit-home/${feature.id}`}>
                <IconButton color="primary">
                  <Edit />
                </IconButton>
              </Link>
            </Grid>
          )}
        </Grid>
      </Card>
    </Grid>
  );
}

export default HomeCard;
