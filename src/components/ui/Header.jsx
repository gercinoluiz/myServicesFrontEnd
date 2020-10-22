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
    justifyContent: "center",
    alignItems: "center",
  },

  service: {
    color: "#ffff",
    maxWidth: "250px",
    textAlign: "center",
    fontWeight: "bold",
  },

  gridService: {
    width: "100%",
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
          className={classes.gridService}
          justify="center"
          container
          alignItems="center"
          textJustify="center"
        >
          <Typography className={classes.service}>
            {props.service ? props.service.name : null}
          </Typography>
        </Grid>
      </AppBar>
    </>
  );
}
export default Header;
