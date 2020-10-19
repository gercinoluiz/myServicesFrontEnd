import React from "react";

// import { useTheme } from "../context/ThemeContext";

import { AppBar, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },

  appBar: {
    backgroundColor: theme.palette.primary.main,
    height: "3.5em",
  },

  service: {
    color: "#ffff",
    maxWidth: "250px",
    textAlign: "center",
    fontWeight: "bold",
  },
}));

function Header(props) {
  // const { theme, setTheme } = useTheme();

  const classes = useStyles();

  return (
    <>
      <div className={classes.toolbar}></div>
      <AppBar className={classes.appBar}>
        <Grid
          textJustify="center"
          justify="center"
          container
          alignItems="center"
        >
          <Typography className={classes.service}>{props.service}</Typography>
        </Grid>
      </AppBar>
    </>
  );
}
export default Header;
