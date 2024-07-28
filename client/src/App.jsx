import './App.css';
import Articles from './pages/Articles';
import AddArticle from './pages/AddArticle';
import EditArticle from './pages/EditArticle';
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
              <Link to="/">
                <Typography variant="h6" component="div">
                  Green News
                </Typography>
              </Link>
              <Link to="/articles" ><Typography>Articles</Typography></Link>
            </Toolbar>
          </Container>
        </AppBar>
        <Container>
          <Routes>
            <Route path={"/"} element={<Articles />} />
            <Route path={"/articles"} element={<Articles />} />
            <Route path={"/addarticle"} element={<AddArticle />} />
            <Route path={"/editarticle/:id"} element={<EditArticle />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
  );
}
export default App;
