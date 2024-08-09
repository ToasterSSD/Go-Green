// src/components/errors/Error404.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Error404 = () => (
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
      404
    </Typography>
    <Typography variant="h5" sx={{ mb: 2 }}>
      Page Not Found
    </Typography>
    <Button variant="contained" component={Link} to="/">
      Go Home
    </Button>
  </Box>
);

export default Error404;
