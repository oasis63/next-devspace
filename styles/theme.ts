// styles/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#DC004E",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#333333",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333333",
    },
    h3: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#333333",
    },
    // Add more typography styles as needed
  },
  spacing: 4, // 4px grid spacing
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
