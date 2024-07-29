import "./App.css";
import { useState, useEffect, useContext } from "react";
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
import SettingsModel from "./components/SettingsModel";
import Footer from "./components/Footer";
import Articles from './pages/Articles';
import AddArticle from './pages/AddArticle';
import EditArticle from './pages/EditArticle';
import PublicArticles from './pages/PublicArticles';
import ArticleDetails from './pages/ArticleDetails';
import LearningTopics from './pages/LearningTopics';
import AddLearningTopic from './pages/AddLearningTopic';
import EditLearningTopic from './pages/EditLearningTopic';
import LearningTopicDetails from './pages/LearningTopicDetails';
import PublicLearningTopics from './pages/PublicLearningTopics';

function App() {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

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

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
    handleMenuClose();
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <ThemeProvider theme={MyTheme}>
          <AppBar
            position="static"
            className="AppBar"
            sx={{ backgroundColor: "#A7A7A7" }}
          >
            <Container sx={{ padding: 0 }}>
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
                      src="/uploads/New logo.png"
                      alt="Go-Green Logo"
                      style={{ height: "40px", marginRight: "10px" }}
                    />
                    <Typography variant="h6" component="div">
                      Go <span style={{ color: "#06F92D" }}>Green</span>!
                    </Typography>
                  </Link>
                </Box>

                <Box sx={{ display: "flex", flexGrow: 1, ml: 4 }}>
                  <MuiLink
                    component={Link}
                    to="/tutorials"
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Tutorials
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/articles"
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Articles
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/public-articles"
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Public Articles
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
                    to="/chatarea"
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Chat Area
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/learning"
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Learning
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/public-learning"
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Public Learning
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/games"
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Games
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/donations"
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Donations
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/feedback"
                    underline="none"
                    color="inherit"
                    sx={{ mx: 2 }}
                  >
                    Feedback
                  </MuiLink>
                </Box>
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
                      alt={user?.name || "Guest"}
                      src={user ? "/static/images/avatar/1.jpg" : ""}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography sx={{ ml: 1 }}>
                      {user?.name || "Guest"}
                    </Typography>
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
                    {user ? (
                      <>
                        <Box
                          sx={{ display: "flex", alignItems: "center", p: 2 }}
                        >
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
                        <MenuItem onClick={handleSettingsOpen}>
                          Settings
                        </MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem
                          component={Link}
                          to="/register"
                          onClick={handleMenuClose}
                        >
                          Register
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          to="/login"
                          onClick={handleMenuClose}
                        >
                          Login
                        </MenuItem>
                      </>
                    )}
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          <Container className={settingsOpen ? "blurred" : ""} sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/announcement" element={<Announcement />} />
              <Route path="/addtutorial" element={<AddTutorial />} />
              <Route path="/edittutorial/:id" element={<EditTutorial />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/form" element={<MyForm />} />
              <Route path="/announcementDetail" element={<AnnouncementDetail />} />
              <Route path="/chatarea" element={<ChatArea />} />
              <Route path="/addannouncement" element={<AddAnnouncement />} />
              <Route path="/editannouncement/:id" element={<EditAnnouncement />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/public-articles" element={<PublicArticles />} />
              <Route path="/addarticle" element={<AddArticle />} />
              <Route path="/editarticle/:id" element={<EditArticle />} />
              <Route path="/public-article/:id" element={<ArticleDetails />} />
              <Route path="/learning" element={<LearningTopics />} />
              <Route path="/add-learning-topic" element={<AddLearningTopic />} />
              <Route path="/edit-learning-topic/:id" element={<EditLearningTopic />} />
              <Route path="/learning/:id" element={<LearningTopicDetails />} />
              <Route path="/public-learning" element={<PublicLearningTopics />} />
            </Routes>
          </Container>
          <Footer />
        </ThemeProvider>
      </Router>
      <SettingsModel open={settingsOpen} onClose={handleSettingsClose} user={user} />
    </UserContext.Provider>
  );
}

export default App;
