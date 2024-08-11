import "./App.css";
import { useState, useEffect, Suspense, lazy } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Link as MuiLink,
  CssBaseline,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "./themes/lightTheme";  // Import light theme
import darkTheme from "./themes/darkTheme";    // Import dark theme
import DarkModeToggle from "./components/DarkModeToggle";  // Import DarkModeToggle component
import http from "./http";
import UserContext from "./contexts/UserContext";
import SettingsModel from "./components/SettingsModel";
import Footer from "./components/Footer";
import SideNavbar from "./components/SideNavbar";
import ReportDetail from "./pages/ReportDetail"; 
import Reports from "./pages/Reports";

// Lazy loading pages
const Home = lazy(() => import("./pages/Home"));
const AddTutorial = lazy(() => import("./pages/AddTutorial"));
const EditTutorial = lazy(() => import("./pages/EditTutorial"));
const MyForm = lazy(() => import("./pages/MyForm"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Announcement = lazy(() => import("./pages/Announcement"));
const ChatArea = lazy(() => import("./pages/ChatArea"));
const AddAnnouncement = lazy(() => import("./pages/AddAnnouncement"));
const EditAnnouncement = lazy(() => import("./pages/EditAnnouncement"));
const Feedback = lazy(() => import("./pages/Feedback"));
const FeedbackAdmin = lazy(() => import("./pages/FeedbackAdmin"));
const AddFeedback = lazy(() => import("./pages/AddFeedback"));
const DeleteFeedback = lazy(() => import("./pages/DeleteFeedback"));
const Articles = lazy(() => import("./pages/Articles"));
const AddArticle = lazy(() => import("./pages/AddArticle"));
const EditArticle = lazy(() => import("./pages/EditArticle"));
const PublicArticles = lazy(() => import("./pages/PublicArticles"));
const ArticleDetails = lazy(() => import("./pages/ArticleDetails"));
const LearningTopics = lazy(() => import("./pages/LearningTopics"));
const AddLearningTopic = lazy(() => import("./pages/AddLearningTopic"));
const EditLearningTopic = lazy(() => import("./pages/EditLearningTopic"));
const LearningTopicDetails = lazy(() => import("./pages/LearningTopicDetails"));
const PublicLearningTopics = lazy(() => import("./pages/PublicLearningTopics"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const SignUpStep1 = lazy(() => import("./pages/SignUpStep1"));
const SignUpStep2 = lazy(() => import("./pages/SignUpStep2"));
const MoreAnnouncement = lazy(() => import("./pages/More_Announcement"));
const Donation = lazy(() => import("./pages/Donation"));
const AddHome = lazy(() => import("./pages/AddHome"));
const EditHome = lazy(() => import("./pages/EditHome"));
const Settings = lazy(() => import("./pages/Settings"));
const Addextrauserinfo = lazy(() => import("./pages/Addextrauserinfo"));
const Editextrauserinfo = lazy(() => import("./pages/Editextrauserinfo"));
const GamePage = lazy(() => import("./pages/Games"));
const AddChat = lazy(() => import("./pages/AddChat"));
const EditChat = lazy(() => import("./pages/EditChat"));


function App() {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [themeMode, setThemeMode] = useState("light");  // State for theme mode

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      http
        .get("/user/auth")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
        });
    }

    // Load theme preference from localStorage if available
    const savedThemeMode = localStorage.getItem("themeMode");
    if (savedThemeMode) {
      setThemeMode(savedThemeMode);
    }
  }, []);

  const toggleTheme = () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newThemeMode);
    localStorage.setItem("themeMode", newThemeMode);  // Save preference
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/";
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

  const PrivateRoute = ({ children }) => {
    return user && user.roles?.includes("ADMIN") ? children : <Navigate to="/login" />;
  };

  const MainContent = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/profile");

    return (
      <>
        {isAdminRoute && <SideNavbar />}
        <Box
          sx={{
            flex: 1,
            ml: isAdminRoute ? { sm: "240px", xs: "60px" } : "0px",
          }}
        >
          <Container className={settingsOpen ? "blurred" : ""} sx={{ mt: 4 }}>
            <Suspense fallback={<CircularProgress />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/announcement" element={<Announcement />} />
                <Route path="/addtutorial" element={<AddTutorial />} />
                <Route path="/edittutorial/:id" element={<EditTutorial />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/form" element={<MyForm />} />
                <Route path="/chatarea" element={<ChatArea />} />
                <Route path="/addannouncement" element={<AddAnnouncement />} />
                <Route
                  path="/editannouncement/:id"
                  element={<EditAnnouncement />}
                />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/feedbackadmin" element={<FeedbackAdmin />} />
                <Route path="/addfeedback" element={<AddFeedback />} />
                <Route
                  path="/deletefeedback/:id"
                  element={<DeleteFeedback />}
                />
                <Route path="/articles" element={<Articles />} />
                <Route path="/public-articles" element={<PublicArticles />} />
                <Route path="/addarticle" element={<AddArticle />} />
                <Route path="/editarticle/:id" element={<EditArticle />} />
                <Route
                  path="/public-article/:id"
                  element={<ArticleDetails />}
                />
                <Route path="/learning" element={<LearningTopics />} />
                <Route
                  path="/add-learning-topic"
                  element={<AddLearningTopic />}
                />
                <Route
                  path="/edit-learning-topic/:id"
                  element={<EditLearningTopic />}
                />
                <Route
                  path="/learning/:id"
                  element={<LearningTopicDetails />}
                />
                <Route
                  path="/public-learning"
                  element={<PublicLearningTopics />}
                />
                <Route path="/quiz" element={<QuizPage />} />
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute>
                      <AdminPanel />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <UserProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/announcement/:id"
                  element={<MoreAnnouncement />}
                />
                <Route
                  path="/announcement-signup-step1/:id"
                  element={<SignUpStep1 />}
                />
                <Route
                  path="/announcement-signup-step2/:id"
                  element={<SignUpStep2 />}
                />
                <Route path="/donation" element={<Donation />} />
                <Route
                  path="/add-home"
                  element={
                    <PrivateRoute>
                      <AddHome />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit-home/:id"
                  element={
                    <PrivateRoute>
                      <EditHome />
                    </PrivateRoute>
                  }
                />
                <Route path="/Settings" element={<Settings />} />
                <Route
                  path="/addextrauserinfo"
                  element={<Addextrauserinfo />}
                />
                <Route
                  path="/editextrauserinfo/:id"
                  element={<Editextrauserinfo />}
                />
                <Route path="/Games" element={<GamePage />} />
                <Route path="/addchat" element={<AddChat />} />
                <Route path="/editchat/:id" element={<EditChat />} />
                <Route path="/reports" element={<Reports />} />
                <Route
                  path="/report-detail/:reportId"
                  element={<ReportDetail />}
                />
              </Routes>
            </Suspense>
          </Container>
        </Box>
      </>
    );
  };

  const appliedTheme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <ThemeProvider theme={appliedTheme}>
          <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden" }}>
            <CssBaseline />
            <AppBar position="static" sx={{ backgroundColor: "#9CBA9A", color: "inherit", width: "100vw", overflow: "hidden" }}>
              <Container sx={{ padding: 0, maxWidth: "100%" }}>
                <Toolbar disableGutters>
                  <Box sx={{ display: "flex", alignItems: "center", width: "auto", whiteSpace: "nowrap" }}>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
                      <img src="/uploads/New logo.png" alt="Go-Green Logo" style={{ height: "40px", marginRight: "10px" }} />
                      <Typography variant="h6" component="div">
                        Go <span style={{ color: "#06F92D" }}>Green</span>!
                      </Typography>
                    </Link>
                  </Box>
                  <Box sx={{ display: "flex", flexGrow: 1, ml: 4 }}>
                    {user?.roles?.includes("ADMIN") && (
                      <MuiLink component={Link} to="/articles" underline="none" color="inherit" sx={{ mx: 2 }}>
                        NewsAdmin
                      </MuiLink>
                    )}
                    <MuiLink component={Link} to="/public-articles" underline="none" color="inherit" sx={{ mx: 2 }}>
                      News
                    </MuiLink>
                    <MuiLink component={Link} to="/announcement" underline="none" color="inherit" sx={{ mx: 2 }}>
                      Announcements
                    </MuiLink>
                    <MuiLink component={Link} to="/chatarea" underline="none" color="inherit" sx={{ mx: 2 }}>
                      Chat
                    </MuiLink>
                    {user?.roles?.includes("ADMIN") && (
                      <MuiLink component={Link} to="/learning" underline="none" color="inherit" sx={{ mx: 2 }}>
                        LearningAdmin
                      </MuiLink>
                    )}
                    <MuiLink component={Link} to="/public-learning" underline="none" color="inherit" sx={{ mx: 2 }}>
                      Learning
                    </MuiLink>
                    <MuiLink component={Link} to="/Games" underline="none" color="inherit" sx={{ mx: 2 }}>
                      Games
                    </MuiLink>
                    <MuiLink component={Link} to="/Donation" underline="none" color="inherit" sx={{ mx: 2 }}>
                      Donations
                    </MuiLink>
                    <MuiLink component={Link} to="/feedback" underline="none" color="inherit" sx={{ mx: 2 }}>
                      Feedback
                    </MuiLink>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", ml: 4, width: "auto", whiteSpace: "nowrap" }}>
                    <Box onClick={handleMenuOpen} sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                      <Avatar alt={user?.name || "Guest"} src={user ? "/static/images/avatar/1.jpg" : ""} sx={{ width: 40, height: 40 }} />
                      <Typography sx={{ ml: 1 }}>{user?.name || "Guest"}</Typography>
                    </Box>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{ sx: { borderRadius: "16px", mt: 1, minWidth: 200, backgroundColor: appliedTheme.palette.background.paper, color: appliedTheme.palette.text.primary } }}
                    >
                      {user && <MenuItem onClick={handleSettingsOpen}>Settings</MenuItem>}
                      {user?.roles?.includes("ADMIN") && (
                        <>
                          <MenuItem component={Link} to="/admin" onClick={handleMenuClose}>
                            Admin Panel
                          </MenuItem>
                          <Divider />
                        </>
                      )}
                      {user ? (
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      ) : (
                        <>
                          <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
                            Register
                          </MenuItem>
                          <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                            Login
                          </MenuItem>
                        </>
                      )}
                    </Menu>
                    <DarkModeToggle toggleTheme={toggleTheme} themeMode={themeMode} sx={{ ml: 'auto' }} />  {/* Dark Mode Toggle */}
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
            <MainContent />
            <Footer />
          </Box>
        </ThemeProvider>
      </Router>
      <SettingsModel open={settingsOpen} onClose={handleSettingsClose} user={user} />
    </UserContext.Provider>
  );
}

export default App;
