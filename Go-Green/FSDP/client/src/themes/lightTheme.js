import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#9CBA9A', // Light green
    },
    secondary: {
      main: '#06F92D', // Bright green
    },
    background: {
      default: '#f0f0f0', // Light background
      paper: '#ffffff',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  },
  typography: {
    fontSize: 14, // Default font size
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f0f0f0', // Ensure the body background is light
          color: '#333', // Ensure the text color is dark
        },
      },
    },
  },
});

export default lightTheme;
