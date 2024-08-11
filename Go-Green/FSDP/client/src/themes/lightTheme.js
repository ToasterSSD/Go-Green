import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#93DAAB',
    },
    secondary: {
      main: '#f4511e',
    },
    background: {
      default: '#ffffff',
      paper: '#f4f4f4',
    },
  },
  typography: {
    // Add typography settings here if needed
  },
  // Add any additional customization here
});

export default lightTheme;
