import { Grid } from "@material-ui/core";
import React from "react";

//My Import

import Header from "../../components/ui/Header";

// Components Import

import LocationsList from "./components/LocationsList";

export default function RefactoredLocation() {
  return (
    <div>
      <Header />

      <Grid>
        <LocationsList />
      </Grid>
    </div>
  );
}
