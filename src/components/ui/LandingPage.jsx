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

import sp from "../../images/sp.png";

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

import { useMediaQuery, useTheme } from "@material-ui/core";

import DateRange from "@material-ui/icons/DateRange";
import Room from "@material-ui/icons/Room";
import CloseIcon from "@material-ui/icons/Close";

import MenuBook from "@material-ui/icons/MenuBook";
import Info from "@material-ui/icons/Info";
import EventAvailable from "@material-ui/icons/EventAvailable";

import map from "../../images/map.png";

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
    color: theme.palette.primary.contrastText,
  },

  address: {
    fontSize: "0.9em",
    fontFamily: "Roboto",
    color: theme.palette.primary.secondaryText,
  },

  distance: {
    fontSize: "1.5em",
    fontFamily: "Roboto",
    marginTop: "1em",
    fontWeight: "bold",
    color: "black",
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

  warning: {
    fontSize: "0.7em",
    color: theme.palette.primary.contrastText,
  },

  mainGrid: {
    position: "absolute",
    width: "25em",
    height: "40em",

    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//=========================MAIN FUNCION=====================================
export default function LandScape() {
  //=====================Variables==========================================
  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  //========================Hooks===========================================

  const [locations, setLocations] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

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
  }, [openServiceDialog, setOpenServiceDialog]);

  // Get coordinates

  // ===================================FUNCTION===============================

  const handleSearchLocationByService = (event, serviceId) => {
    getLocationsByService(serviceId, latlng).then((response) => {
      setLocations(response.data.places);
    });
  };

  const handleSearch = (value) => {
    const newFilteredServices = services.filter((filtered) =>
      filtered.name.toUpperCase().startsWith(value.toUpperCase())
    );

    setFilteredServices(newFilteredServices);
  };

  // =================================Components=======================================

  const locationsCards = locations.map((location) => {
    return (
      <div>
        <Card className={classes.Card}>
          <CardContent>
            <Grid container justify="space-around">
              <Grid item style={{ width: "15em" }}>
                <Typography className={classes.title}>
                  {location.name}
                </Typography>
                <Grid className={classes.gridIcon}>
                  <Typography className={classes.address}>
                    {location.address ? location.address.street : "Not found"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  style={{
                    width: "5em",
                    height: "4em",
                    backgroundImage: `url(${map})`,
                    opacity: "1",
                    color: "black",
                    borderRadius: 5,
                    textAlign: "center",
                  }}
                >
                  <Typography className={classes.distance}>
                    {location.distance.toString().substring(0, 2)} KM
                  </Typography>
                  Distancia
                </Grid>
              </Grid>
              <Grid container>
                <Typography className={classes.warning}>
                  * Verifique a política de agendamento da unidade no site.
                </Typography>
                <Typography className={classes.warning}>
                  * Clique para mais detalhes.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  });
  console.log({ filteredServices });

  const serviceDialog = (
    <Dialog
      fullScreen
      open={openServiceDialog}
      color="primary"
      onClose={() => {
        setOpenServiceDialog(false);
      }}
      TransitionComponent={Transition}
    >
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => {
              setOpenServiceDialog(false);
              setFilteredServices([]);
            }}
            arial-labe="close"
          >
            <CloseIcon />
          </IconButton>
          <Paper className={classes.textBox}>
            <InputBase
              label="Pesquise o serviço"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Pequise o serviço"
            />
          </Paper>
        </Toolbar>
      </AppBar>
      <div className={classes.toolBar} />
      <Divider />
      <List>
        {filteredServices.length !== 0 ? (
          filteredServices.map((service) => {
            return (
              <>
                <ListItem
                  button
                  onClick={(e) => {
                    handleSearchLocationByService(e, service._id);
                    setOpenServiceDialog(false);
                    setFilteredServices([]);
                  }}
                >
                  <ListItemText>{service.name}</ListItemText>
                </ListItem>
                <Divider />
              </>
            );
          })
        ) : services ? (
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
    <div  >
      <Grid  className={classes.mainGrid}>{locationsCards}</Grid>

      {serviceDialog}
    </div>
  );
}
