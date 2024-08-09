// src/components/errors/Error401.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Error401 = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
    }}
  >
    <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold' }}>
      401
    </Typography>
    <Typography variant="h5" sx={{ mb: 2 }}>
      Unauthorized
    </Typography>
    <Button variant="contained" component={Link} to="/login">
      Login
    </Button>
  </Box>
);

export default Error401;
