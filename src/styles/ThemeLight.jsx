import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    common: {},
    primary: {
      main: "#0063a7",
      light: "#BBDEFB",
      contrastText: "#34495e",
      secondaryText: "#757575",
    },
  },

  typography: {
    h3: {
      color: "#0A79DF",
      fontWeight: "bold",
      fontFamily: "Robotto",
      fontSize: "2em",
    },

    h4: {
      color: "#0A79DF",
      fontWeight: "bold",
      fontFamily: "Robotto",
      fontSize: "1.5em",
    },

    body2: {
      color: "#757575",
      fontFamily: "Robotto",
      fontSize: "1em",
    },
  },

  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl", "mi"],
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      mi: 411,
    },
  },
});
