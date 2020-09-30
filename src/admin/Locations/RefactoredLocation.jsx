import { Grid } from "@material-ui/core";
import { makeStyles, Typography } from "@material-ui/core";

import React, { useState } from "react";

//My Import

import Header from "../../components/ui/Header";

// Components Import

import LocationsList from "./components/LocationsList";

import CadForms from "./components/CadForms";

const useStyles = makeStyles((theme) => ({
  cadGrid: {
    marginLeft: "11em",
    [theme.breakpoints.down("lg")]: {
      marginLeft: "5em",
    },
  },
}));

export default function RefactoredLocation() {
  const [selectedItemLit, setSelectedItemList] = useState("");

  const classes = useStyles();

  return (
    <div>
      <Header />

      <Grid container direction="row">
        <Grid item>
          <LocationsList selectedList={(value) => setSelectedItemList(value)} />
        </Grid>
        <Grid item className={classes.cadGrid}>
          <CadForms listItem={selectedItemLit} />
        </Grid>
      </Grid>
    </div>
  );
}
