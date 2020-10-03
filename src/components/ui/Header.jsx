import React from "react";

import { useTheme } from "../context/ThemeContext";

import {
  AppBar,
  Grid,
  Button,
  makeStyles,
  IconButton,
} from "@material-ui/core";

import Brightness4 from "@material-ui/icons/Brightness4";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
    height: "3.5em",
    position: "static",
  },

  appBar: {
    backgroundColor: theme.palette.primary.main,
    height: "3.5em",
  },
}));

function Header() {
  const { theme, setTheme } = useTheme();

  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appBar}>
        <Grid justify="space-between" container>
          <Grid item></Grid>
          <Grid item>
            {/* <IconButton onClick={() => setTheme(theme ? false : true)}>
              <Brightness4 />
            </IconButton> */}
          </Grid>
        </Grid>
      </AppBar>
      <div className={classes.toolbar}></div>
    </>
  );
}
export default Header;
