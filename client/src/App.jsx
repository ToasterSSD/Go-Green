import './App.css';
import Articles from './pages/Articles';
import AddArticle from './pages/AddArticle';
import EditArticle from './pages/EditArticle';
import PublicArticles from './pages/PublicArticles';
import ArticleDetails from './pages/ArticleDetails';
import LearningTopics from './pages/LearningTopics';
import AddLearningTopic from './pages/AddLearningTopic';
import EditLearningTopic from './pages/EditLearningTopic';
import LearningTopicDetails from './pages/LearningTopicDetails';
import PublicLearningTopics from './pages/PublicLearningTopics'; // Import the new component
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import MyTheme from './themes/MyTheme';

function App() {
  return (
    <Router>
      <ThemeProvider theme={MyTheme}>
        <AppBar position="static" className='AppBar'>
          <Container>
            <Toolbar disableGutters={true}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6" component="div">
                  Green News
                </Typography>
              </Link>
              <Link to="/articles" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6" component="div" sx={{ ml: 2 }}>
                  Articles
                </Typography>
              </Link>
              <Link to="/public-articles" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6" component="div" sx={{ ml: 2 }}>
                  Public Articles
                </Typography>
              </Link>
              <Link to="/learning" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6" component="div" sx={{ ml: 2 }}>
                  Learning
                </Typography>
              </Link>
              <Link to="/public-learning" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6" component="div" sx={{ ml: 2 }}>
                  Public Learning
                </Typography>
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/public-articles" element={<PublicArticles />} />
            <Route path="/addarticle" element={<AddArticle />} />
            <Route path="/editarticle/:id" element={<EditArticle />} />
            <Route path="/public-article/:id" element={<ArticleDetails />} />
            <Route path="/learning" element={<LearningTopics />} />
            <Route path="/add-learning-topic" element={<AddLearningTopic />} />
            <Route path="/edit-learning-topic/:id" element={<EditLearningTopic />} />
            <Route path="/learning/:id" element={<LearningTopicDetails />} />
            <Route path="/public-learning" element={<PublicLearningTopics />} /> {/* Add route for PublicLearningTopics */}
          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;






