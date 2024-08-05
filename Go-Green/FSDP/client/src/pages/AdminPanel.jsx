import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  CssBaseline,
  Paper,
  Typography,
  Avatar,
  Grid,
  Divider,
  Button,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import SideNavbar from '../components/SideNavbar';
import http from '../http';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    } else {
      fetchUserDetails(token);
    }
  }, [navigate]);

  const fetchUserDetails = async (token) => {
    try {
      const response = await http.get('/user/auth', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user details", error);
      navigate('/login');
    }
  };

  const handleClick = () => {
    setClickCount(prevCount => prevCount + 1);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideNavbar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Welcome, {user ? user.name : 'Admin'}
          </Typography>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                <Person fontSize="large" />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                User Management Dashboard
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body1" gutterBottom>
            This is the admin panel where you can manage user profiles, categories, and feedback. Use the navigation links on the side to access different sections of the admin dashboard.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Click the button below to see a special effect every 10 clicks!
          </Typography>
          <Paper elevation={3} sx={{ p: 2, mt: 3, textAlign: 'center', bgcolor: clickCount % 10 === 0 && clickCount !== 0 ? '#f5f5f5' : 'white' }}>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Click Me!
            </Button>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Click Count: {clickCount}
            </Typography>
            {clickCount % 10 === 0 && clickCount !== 0 && (
              <Typography variant="h6" sx={{ color: 'green' }}>
                🎉 You've reached {clickCount} clicks! 🎉
              </Typography>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPanel;
