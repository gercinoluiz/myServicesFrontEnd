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

import Search from "@material-ui/icons/Search";

import { makeStyles } from "@material-ui/core";

//API CALLS
import { getAllLocations } from "../../../apiCalls/apiCalls";

//Styles

const useStyles = makeStyles((theme) => ({
  locationsList: {
    width: 300,
    backgroundColor: "#f5f5f5",
  },

  LocationSearchBox: {
    width: 250,
    height: 50,
  },
  searchBox: {
    marginRight: 5,
    marginTop: 10,
    position: "relative",
  },
}));

const LocationsList = (props) => {
  const classes = useStyles();

  // State
  const [locations, setLocations] = useState();
  const [filteredLocations, setFilteredLocations] = useState();

  const [selectedLocation, setSelectedLocation] = useState("");

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
    }); // I am using toUpperCase as a turnoround for casesensitive

    //then I am setting a new filtered State based on the on from the API
    setFilteredLocations({
      ...locations,
      data: { ...locations.data, places: filteredArray },
    });
  };

  const handleLocationTextFild = (location) => {
    props.selectedList(location);
  };

  const handleSelectedLocation = (e, index) => {
    setSelectedLocation(index);
  };

  //Functions
  const listLocations = () => {
    return (
      <Paper className={classes.locationsList}>
        <Grid container direction="column" alignItems="center">
          <Paper elevation={3} className={classes.searchBox}>
            <Grid container alignItems="center">
              <InputBase
                variant="outlined"
                onChange={(e) => handleLocations(e.target.value)}
                className={classes.LocationSearchBox}
                placeholder="Procurar unidade"
              />
              <Search />
            </Grid>
       
          </Paper>
          <List>
            {filteredLocations ? (
              filteredLocations.data.places.map((location, index) => {
                return (
                  <>
                    <ListItem
                      key={index}
                      button
                      selected={selectedLocation === location._id}
                      onClick={(e) => {
                        handleLocationTextFild(location);
                        handleSelectedLocation(e, location._id);
                      }}
                    >
                      <ListItemText>{location.name}</ListItemText>
                    </ListItem>
                    <Divider />
                  </>
                );
              })
            ) : locations ? (
              locations.data.places.map((location, index) => {
                return (
                  <>
                    <ListItem
                      onClick={(e) => {
                        handleLocationTextFild(location);
                        handleSelectedLocation(e, location._id);
                      }}
                      key={index}
                      button
                      selected={selectedLocation === location._id}
                    >
                      <ListItemText>{location.name}</ListItemText>
                    </ListItem>
                    <Divider />
                  </>
                );
              })
            ) : (
              <h1>Loading</h1>
            )}
          </List>
        </Grid>
      </Paper>
    );
  };

  return <>{listLocations()}</>;
};

export default React.memo(LocationsList);
