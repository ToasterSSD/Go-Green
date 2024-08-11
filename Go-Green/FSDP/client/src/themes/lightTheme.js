import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#9CBA9A', // light green
    },
    secondary: {
      main: '#06F92D', // bright green
    },
    background: {
      default: '#f0f0f0', // light background
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
          backgroundColor: '#f0f0f0', // ensure the body background is light
          color: '#333', // ensure the text color is dark
        },
      },
    },
  },
});

export default lightTheme;
