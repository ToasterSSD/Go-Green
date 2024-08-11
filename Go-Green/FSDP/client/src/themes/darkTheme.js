import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#A3D9A5', // dark green
    },
    secondary: {
      main: '#8FBC8F', // muted green
    },
    background: {
      default: '#000000', // Pure black background
      paper: '#121212', // dark paper background
    },
    text: {
      primary: '#f0f0f0',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontSize: 14,
    h6: {
      color: '#ffffff', // White color for headers
      fontWeight: 'bold', // Bold headers for better readability
    },
    body1: {
      color: '#f0f0f0', // Light text color for body text
    },
    body2: {
      color: '#cccccc', // Slightly lighter text for secondary information
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212', // Matching Paper background
          color: '#f0f0f0',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)', // Shadow for depth
          borderRadius: '10px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#f0f0f0', // Ensure all text is light for readability
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root': {
            color: 'black', // Ensure text inside cards is light-colored
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#000000', // Ensure the body background is pure black
          color: '#f0f0f0', // Ensure the text color is light
        },
      },
    },
  },
});

export default darkTheme;
