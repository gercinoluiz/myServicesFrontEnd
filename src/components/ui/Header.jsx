import React from "react";

// import { useTheme } from "../context/ThemeContext";

import {
  AppBar,
  Grid,
  makeStyles,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },

  appBar: {
    backgroundColor: theme.palette.primary.main,
    height: "3.5em",
  },
}));

function Header() {
  // const { theme, setTheme } = useTheme();

  const classes = useStyles();

  return (
    <>
      <div className={classes.toolbar}></div>
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
    </>
  );
}
export default Header;
