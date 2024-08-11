// components/DarkModeToggle.js
import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const DarkModeToggle = ({ toggleTheme, themeMode }) => {
  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
};

export default DarkModeToggle;
