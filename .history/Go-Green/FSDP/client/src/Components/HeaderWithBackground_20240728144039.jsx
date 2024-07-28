// src/components/HeaderWithBackground.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const HeaderWithBackground = ({ title, backgroundImage }) => {
  return (
    <Box
      sx={{
        height: "200px", // Adjust the height as needed
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white", // Adjust the text color as needed
        textShadow: "1px 1px 2px black", // Add text shadow for better readability
      }}
    >
      <Typography variant="h2">{title}</Typography>
    </Box>
  );
};

export default HeaderWithBackground;
