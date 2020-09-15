import React from "react";

// MUI

import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";

import MenuBook from "@material-ui/icons/MenuBook";
import Info from "@material-ui/icons/Info";
import LocationCity from "@material-ui/icons/LocationCity";
import Search from "@material-ui/icons/Search";

import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  BottomNavigation: {
    width: 450,

  },
  icons: {
    color: theme.palette.primary.main,
  },
}));

export default function AppBarFooter() {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  return (
    <div>
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
        />
        <BottomNavigationAction
          label="Serviços"
          icon={<MenuBook className={classes.icons} />}
        />
        <BottomNavigationAction
          label="Unidades"
          icon={<LocationCity className={classes.icons} />}
        />
        <BottomNavigationAction
          label="Procurar Serviço"
          icon={<Search className={classes.icons} />}
        />
      </BottomNavigation>
    </div>
  );
}
