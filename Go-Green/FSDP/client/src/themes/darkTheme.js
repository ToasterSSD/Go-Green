import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#556B2F', // dark green
    },
    secondary: {
      main: '#8FBC8F', // muted green
    },
    background: {
      default: '#1e1e1e', // dark background
      paper: '#121212', // dark paper background
    },
    text: {
      primary: '#f0f0f0',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontSize: 14, // Default font size
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#1e1e1e', // ensure the body background is dark
          color: '#f0f0f0', // ensure the text color is light
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#2c2c2c', // Slightly lighter background for cards
          color: '#f0f0f0', // Light text color for better contrast
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)', // Add shadow for depth
          borderRadius: '10px', // Rounded corners
          // Removed hover effects
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2c2c2c', // Matching Paper background
          color: '#f0f0f0',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)', // Shadow for depth
          borderRadius: '10px',
          // Removed hover effects
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#4caf50', // Bright green button
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#45a049', // Darker green on hover
          },
        },
      },
    },
  },
});

export default darkTheme;
