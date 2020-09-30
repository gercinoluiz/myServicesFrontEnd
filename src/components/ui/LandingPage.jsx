import React, { useEffect, useState } from "react";
import AppBarFooter from "./AppBarFooter";
import Header from "./Header";
import {
  getLocationsByService,
  getAllServices,
  getAllNearLocations,
} from "../../apiCalls/apiCalls";

import { useServiceDialog } from "../context/ServiceDialogContext";

import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  makeStyles,
  List,
} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";

import DateRange from "@material-ui/icons/DateRange";
import Room from "@material-ui/icons/Room";
import CloseIcon from "@material-ui/icons/Close";

import MenuBook from "@material-ui/icons/MenuBook";
import Info from "@material-ui/icons/Info";
import EventAvailable from "@material-ui/icons/EventAvailable";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    ...theme.mixins.toolBar,
    height: "4em",
  },

  Card: {
    width: "25em",
    height: "9em",
    marginTop: "0.5em",
  },

  title: {
    fontSize: "1em",
    fontFamily: "Roboto",
    fontWeight: "Bold",
  },

  address: {
    fontSize: "0.9em",
    fontFamily: "Roboto",
  },

  distance: {
    fontSize: "0.7m",
    fontFamily: "Roboto",
    marginTop: "1em",
    fontWeight: "bold",
  },

  iconCalendar: {
    color: "red",
    fontSize: "1.5em",
  },

  iconInfo: {
    color: theme.palette.primary.main,
    fontSize: "1.5em",
  },

  cardTypography: {
    fontSize: "0.8em",
    color: "",
  },
  iconsGrid: {
    marginLeft: "1em",
  },

  appBarDialog: {
    position: "relative",
  },
  appBarDialogTitle: {
    marginLefi: "1em",
    flex: 1,
  },

  textBox: {
    width: "20em",
    height: "3em",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//=========================MAIN FUNCION=====================================
export default function LandScape() {
  //=====================Variables==========================================
  const classes = useStyles();

  //========================Hooks===========================================

  const [locations, setLocations] = useState([]);
  const [services, setServices] = useState([]);

  //getting location
  let latlng;
  navigator.geolocation.getCurrentPosition((position) => {
    latlng = `${position.coords.latitude}, ${position.coords.longitude}`;
  });

  //Context

  const { openServiceDialog, setOpenServiceDialog } = useServiceDialog();

  // GET Nearst Location by Service
  useEffect(() => {
    getAllNearLocations(latlng)
      .then((locations) => {
        setLocations(locations.data.places);
      })
      .catch(() => {
        //FIX: Come back Here
        return <h1>Error</h1>;
      });
  }, []);

  // GET ALL SERVICES

  useEffect(() => {
    getAllServices().then((services) => {
      setServices(services.data.services);
    });
  }, []);

  // Get coordinates

  // ===================================FUNCTION===============================

  const handleSearchLocationByService = (event, serviceId) => {
    getLocationsByService(serviceId, latlng).then((response) => {
      setLocations(response.data.places);
    });
  };

  const handlSearchBar = () => {};

  // =================================Components=======================================

  const locationsCards = locations.map((location) => {
    return (
      <div>
        <Grid>
          <Card className={classes.Card}>
            <CardContent>
              <Typography className={classes.title}>{location.name}</Typography>
              <Typography className={classes.address}>
                {location.address ? location.address.street : "Not found"}
              </Typography>
              <Typography className={classes.distance}>
                Distância: {location.distance.toString().substring(0, 2)} KM
              </Typography>
            </CardContent>

            <CardActions>
              <Grid container justify="space-between" alignItems="center">
                <Grid className={classes.iconsGrid} item>
                  <Grid
                    item
                    container
                    alignItems="center"
                    direction="column"
                  ></Grid>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </div>
    );
  });

  const serviceDialog = (
    <Dialog
      fullScreen
      open={openServiceDialog}
      color="primary"
      onClose={() => setOpenServiceDialog(false)}
      TransitionComponent={Transition}
    >
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setOpenServiceDialog(false)}
            arial-labe="close"
          >
            <CloseIcon />
          </IconButton>
          <Paper className={classes.textBox}>
            <InputBase label="Pesquise o serviço" />
          </Paper>
          <Button
            autoFocus
            color="inherit"
            onClick={() => setOpenServiceDialog(false)}
          >
            Pesquisar Serviço
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.toolBar} />
      <Divider />
      <List>
        {services ? (
          services.map((service) => {
            return (
              <>
                <ListItem
                  button
                  onClick={(e) => {
                    handleSearchLocationByService(e, service._id);
                    setOpenServiceDialog(false);
                  }}
                >
                  <ListItemText>{service.name}</ListItemText>
                </ListItem>
                <Divider />
              </>
            );
          })
        ) : (
          <h1>Waiting</h1>
        )}
      </List>
    </Dialog>
  );

  return (
    <div>
      {locationsCards}

      {serviceDialog}
    </div>
  );
}
