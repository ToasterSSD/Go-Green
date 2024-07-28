import "./App.css";
import { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import MyTheme from "./themes/MyTheme";
import Tutorials from "./pages/Tutorials";
import AddTutorial from "./pages/AddTutorial";
import EditTutorial from "./pages/EditTutorial";
import MyForm from "./pages/MyForm";
import Register from "./pages/Register";
import Login from "./pages/Login";
import http from "./http";
import Home from "./pages/Home"; 
import UserContext from "./contexts/UserContext";
import Announcement from "./pages/Announcement";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import ChatArea from "./pages/ChatArea";
import AddAnnouncement from "./pages/AddAnnouncement";
import EditAnnouncement from "./pages/EditAnnouncement";
import AdminComponent from "./pages/AdminComponent";
import UserComponent from "./pages/UserComponent";

function App() {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http.get("/user/auth").then((res) => {
        setUser(res.data.user);
      });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <ThemeProvider theme={MyTheme}>
          <AppBar position="static" className="AppBar">
            <Container>
              <Toolbar disableGutters>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/uploads/Go-Green-logo.png"
                      alt="Go-Green Logo"
                      style={{ height: "40px", marginRight: "10px" }}
                    />
                    <Typography variant="h6" component="div">
                      Go-Green
                    </Typography>
                  </Link>
                </Box>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/uploads/New logo.png"
                    alt="Go-Green Logo"
                    style={{ height: "50px", marginRight: "10px" }}
                  />
                  <Typography variant="h6" component="div">
                    Go-Green
                  </Typography>
                </Link>
                <Box sx={{ display: "flex", flexGrow: 1, ml: 2 }}>
                  <MuiLink
                    component={Link}
                    to="/tutorials" // to be removed
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Tutorials
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/News" //change to your own page name
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    News
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/announcement"
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Announcements
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/chatarea" //WIP
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Chat Area
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/Learning" //change to your own page name
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Learn
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/Games" //change to your own page name
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Games
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/Donations" //change to your own page name
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Donations
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/Feedback" //change to your own page name
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Feedback
                  </MuiLink>
                </Box>

                {user ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      onClick={handleMenuOpen}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Avatar
                        alt={user.name}
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 40, height: 40 }}
                      />
                      <Typography sx={{ ml: 1 }}>{user.name}</Typography>
                    </Box>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{
                        sx: {
                          borderRadius: "16px",
                          mt: 1,
                          minWidth: 200,
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                        <Avatar
                          alt={user.name}
                          src="/static/images/avatar/1.jpg"
                          sx={{ width: 40, height: 40, mr: 2 }}
                        />
                        <Typography variant="body1" noWrap>
                          {user.name}
                        </Typography>
                      </Box>
                      <Divider />
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex" }}>
                    <MuiLink
                      component={Link}
                      to="/register"
                      underline="none"
                      color="inherit"
                      sx={{ mx: 2 }}
                    >
                      Register
                    </MuiLink>
                    <MuiLink
                      component={Link}
                      to="/login"
                      underline="none"
                      color="inherit"
                      sx={{ mx: 2 }}
                    >
                      Login
                    </MuiLink>
                  </Box>
                )}
              </Toolbar>
            </Container>
          </AppBar>

          <Container sx={{ mt: 4 }}>
            <Routes>
              {/* <Route
                path="/"
                element={
                  user?.role === "ADMIN" ? (
                    <AdminComponent />
                  ) : (
                    <UserComponent />
                  )
                }
              /> */}
              <Route path="/" element={<Home />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/announcement" element={<Announcement />} />
              <Route path="/addtutorial" element={<AddTutorial />} />
              <Route path="/edittutorial/:id" element={<EditTutorial />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/form" element={<MyForm />} />
              <Route
                path="/announcementDetail"
                element={<AnnouncementDetail />}
              />
              <Route path="/chatarea" element={<ChatArea />} />
              <Route path="/addannouncement" element={<AddAnnouncement />} />
              <Route
                path="/editannouncement/:id"
                element={<EditAnnouncement />}
              />
            </Routes>
          </Container>
        </ThemeProvider>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
