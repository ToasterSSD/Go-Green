// src/components/HeaderWithBackground.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const HeaderWithBackground = ({ title, backgroundImage }) => {
  return (
    <Box
      sx={{
        width: "100vw", // Full viewport width
        marginLeft: "calc(-50vw + 50%)", // Center align
        height: "300px", // Adjust the height as needed
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fa", // Adjust the text color as needed
        textShadow: "1px 1px 2px black", // Add text shadow for better readability
        marginBottom: "32px",
        marginTop: "-32px",
      }}
    >
      <Typography variant="h2">{title}</Typography>
    </Box>
  );
};

export default HeaderWithBackground;
