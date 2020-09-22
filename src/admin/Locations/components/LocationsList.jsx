import React, { useEffect, useState } from "react";

//@ MUI Import
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Divider, IconButton, InputBase } from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";

import { makeStyles } from "@material-ui/core";

//API CALLS
import { getAllLocations } from "../../../apiCalls/apiCalls";

//Styles

const useStyles = makeStyles((theme) => ({
  locationsList: {
    maxWidth: 350,
  },
}));

export default function LocationsList() {
  const classes = useStyles();

  // State
  const [locations, setLocations] = useState();

  //Effect
  useEffect(() => {
    getAllLocations().then((location) => {
      setLocations(location);
    });
  }, []);

  const handleLocations = (value) => {
    const filteredArray = locations.data.places.filter((locations) => {
      //the current value
      return locations.name.toUpperCase().startsWith(value.toUpperCase()); // I ways have to return the value I wnat
    }); // I am using toUpperCase as a turnoround for case


// const {newArray} = ...locations;


    setLocations({...locations, data:{...locations.data, places: filteredArray}}) // *! analisar isso
    
    console.log({locations});


    

    // setLocations(...locations,  {places: filteredArray}); // setLocations (filteredArray);
  };

  console.log({ locations });
  //Functions
  const listLocations = () => {
    return (
      <Paper className={classes.locationsList}>
        <TextField onChange={(e) => handleLocations(e.target.value)} />
        <List>
          {locations ? (
            locations.data.places.map((location, index) => {
              return (
                <>
                  <ListItem key={index} button>
                    <ListItemText>{location.name}</ListItemText>
                  </ListItem>
                  <Divider />
                </>
              );
            })
          ) : (
            <h1>Loadiding...</h1>
          )}
        </List>
      </Paper>
    );
  };

  return <>{listLocations()}</>;
}
