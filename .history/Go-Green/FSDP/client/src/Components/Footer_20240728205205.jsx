import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link as MuiLink,
} from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";

function Footer() {
  return (
    <Box sx={{ backgroundColor: "#A7A7A7", p: 4, mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/uploads/New logo.png"
              alt="Go-Green Logo"
              style={{ height: "130px", marginRight: "10px" }}
            />
            <Typography variant="h4" component="div">
              Go <span style={{ color: "#06F92D" }}>Green</span>!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">About</Typography>
          <MuiLink href="#" underline="none" color="inherit">
            About Us
          </MuiLink>
          <br />
          <MuiLink href="#" underline="none" color="inherit">
            Contact Us
          </MuiLink>
          <br />
          <MuiLink href="#" underline="none" color="inherit">
            FAQ
          </MuiLink>
          <br />
          <MuiLink href="#" underline="none" color="inherit">
            Location
          </MuiLink>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Socials</Typography>
          <Box>
            <MuiLink href="#" underline="none" color="inherit" sx={{ mx: 1 }}>
              <Facebook />
            </MuiLink>
            <MuiLink href="#" underline="none" color="inherit" sx={{ mx: 1 }}>
              <Twitter />
            </MuiLink>
            <MuiLink href="#" underline="none" color="inherit" sx={{ mx: 1 }}>
              <Instagram />
            </MuiLink>
            <MuiLink href="#" underline="none" color="inherit" sx={{ mx: 1 }}>
              <YouTube />
            </MuiLink>
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Newsletter
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Enter your email"
              sx={{ backgroundColor: "white", borderRadius: "4px", mr: 1 }}
            />
            <Button variant="contained" color="primary">
              Join
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
