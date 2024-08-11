import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";

function Footer() {
  return (
    <Box sx={{ backgroundColor: "#A2C2E2", padding: "20px 0", mt: 5 }}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/uploads/New logo.png"
            alt="Go-Green Logo"
            style={{ height: "120px", marginRight: "10px" }}
          />
          <Typography variant="h4" component="div">
            Go <span style={{ color: "#06F92D" }}>Green</span>!
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            About
          </Typography>
          <Link href="#" color="inherit" underline="none" sx={{ mb: 0.5 }}>
            About Us
          </Link>
          <Link href="#" color="inherit" underline="none" sx={{ mb: 0.5 }}>
            Contact Us
          </Link>
          <Link href="#" color="inherit" underline="none" sx={{ mb: 0.5 }}>
            FAQ
          </Link>
          <Link href="#" color="inherit" underline="none" sx={{ mb: 0.5 }}>
            Location
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Socials
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "120px",
            }}
          >
            <Facebook />
            <Twitter />
            <Instagram />
            <YouTube />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Newsletter
          </Typography>
          <Box sx={{ display: "flex" }}>
            <TextField
              placeholder="Enter your email"
              size="small"
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            />
            <Button variant="contained" color="success" sx={{ ml: 1 }}>
              Join
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default React.memo(Footer);
