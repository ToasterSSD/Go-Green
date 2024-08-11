import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#93DAAB',  // Light green for primary actions
    },
    secondary: {
      main: '#f4511e',  // Reddish-orange for secondary actions
    },
    background: {
      default: '#121212', // Very dark background
      paper: '#1e1e1e',   // Slightly lighter for cards/panels
    },
    text: {
      primary: '#ffffff', // White text for high contrast
      secondary: '#b0b0b0', // Grey text for secondary information
    },
    action: {
      active: '#ffffff', // White active icons for contrast
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1d1d1d',  // Darker background for cards
          color: '#ffffff', // Ensure text on cards is white
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff', // White text for better readability
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: '#ffffff', // White text inside inputs
          backgroundColor: '#333333', // Darker background for input fields
          borderColor: '#93DAAB', // Light green border
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#93DAAB', // Primary green button color
          color: '#121212', // Dark text on button for contrast
          '&:hover': {
            backgroundColor: '#81c784', // Slightly darker green on hover
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#93DAAB', // Primary icon button color
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#444444', // Darker color for dividers to blend with dark theme
        },
      },
    },
  },
});

export default darkTheme;
