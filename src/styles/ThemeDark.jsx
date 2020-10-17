import { createMuiTheme } from "@material-ui/core";

export default  createMuiTheme({
  palette: {
    common: {},
    primary: {
      main: "#03A9F4",
      light:"#BBDEFB",
      contrastText:"#212121",
      secondaryText:"#757575"
    },
  },

  typography: {
    h3: {
      color: "#03A9F4",
      fontWeight: "bold",
      fontFamily: "Robotto",
      fontSize: "2em",
    },

    h4: {
      color: "#03A9F4",
      fontWeight: "bold",
      fontFamily: "Robotto",
      fontSize: "1.5em",
    },

    body2: {
      color: "#03A9F4",
      fontFamily: "Robotto",
      fontSize: "1em",
    },
  },
});
