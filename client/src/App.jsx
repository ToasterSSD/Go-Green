import './App.css';
import Articles from './pages/Articles';
import AddArticle from './pages/AddArticle';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link }


  from 'react-router-dom';
function App() {
  return (
    <Router>
      <AppBar position="static" className='AppBar'>
        <Container>
          <Toolbar disableGutters={true}>
            <Link to="/">
              <Typography variant="h6" component="div">
                Green News
              </Typography>
            </Link>
            <Link to="/tutorials" ><Typography>Articles</Typography></Link>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Routes>
          <Route path={"/"} element={<Articles />} />
          <Route path={"/articles"} element={<Articles />} />
          <Route path={"/addarticle"} element={<AddArticle />} />
        </Routes>
      </Container>
    </Router>
  );
}
export default App;
