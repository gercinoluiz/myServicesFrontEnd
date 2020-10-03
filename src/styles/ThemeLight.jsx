import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    common: {},
    primary: {
      main: "#0A79DF",
      light: "#BBDEFB",
      contrastText: "#212121",
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
});
