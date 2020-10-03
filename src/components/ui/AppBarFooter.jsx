import React, { useState, useContext } from "react";
import { useServiceDialog } from "../context/ServiceDialogContext";

/*Documentation:

1-To fix the Bottom Navigation at the bottom, I wraped it into an AppBar and 
gave the same backGround to both.

2- I am using the contex API to control how the components Acces the state of services


*/

// MUI

import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  AppBar,
  Grid,
} from "@material-ui/core";

import MenuBook from "@material-ui/icons/MenuBook";
import Info from "@material-ui/icons/Info";
import LocationCity from "@material-ui/icons/LocationCity";
import Search from "@material-ui/icons/Search";

import { useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  BottomNavigation: {
    width: 450,
  },
  icons: {
    color: theme.palette.primary.main,
  },
  botomAppBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "#ffff",
    position: "fixed",
  },
}));

export default function AppBarFooter() {
  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const {
    openServiceDialog,
    setOpenServiceDialog,
    setOpenInfo,
  } = useServiceDialog();

  const [value, setValue] = useState(0);

  return (
    <div>
      <AppBar className={classes.botomAppBar}>
        <Grid container justify="center">
          <BottomNavigation
            value={value}
            onChange={(value, newValue) => {
              setValue(newValue);
            }}
            className={classes.BottomNavigation}
          >
            <BottomNavigationAction
              label="Info."
              icon={<Info className={classes.icons} />}
              onClick={() => setOpenInfo(true)}
            />

            <BottomNavigationAction
              label="Unidades"
              icon={<LocationCity className={classes.icons} />}
              onClick={() => window.location.reload(false)}
            />

            <BottomNavigationAction
              label="Procurar Serviço"
              icon={<Search className={classes.icons} />}
              onClick={() => {
                openServiceDialog
                  ? setOpenServiceDialog(false)
                  : setOpenServiceDialog(true);

                setOpenInfo(false);
              }}
            />
          </BottomNavigation>
        </Grid>
      </AppBar>
    </div>
  );
}
