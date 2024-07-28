// src/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button color="inherit">Register</Button>
        </Link>
        <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
          <Button color="inherit">Login</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
