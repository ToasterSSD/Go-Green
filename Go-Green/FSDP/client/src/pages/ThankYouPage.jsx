import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import http from '../http';
import UserContext from '../contexts/UserContext';

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const amount = params.get('amount');
  const frequency = params.get('frequency'); // Get the donation frequency

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Thank You for Your Donation!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your generous donation of ${amount} {frequency && `(${frequency})`} will make a huge difference.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Return to Home
      </Button>
    </Box>
  );
};

export default ThankYouPage;
