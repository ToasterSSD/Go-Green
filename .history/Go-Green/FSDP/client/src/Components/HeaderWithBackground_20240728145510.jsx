// src/components/HeaderWithBackground.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const HeaderWithBackground = ({ title, backgroundImage }) => {
  return (
    <Box
      sx={{
        height: "300px", // Adjust the height as needed
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fafafa", // Adjust the text color as needed
        textShadow: "1px 1px 2px black", // Add text shadow for better readability
        padding: "10px"
        
      }}
    >
      <Typography variant="h2">{title}</Typography>
    </Box>
  );
};

export default HeaderWithBackground;
