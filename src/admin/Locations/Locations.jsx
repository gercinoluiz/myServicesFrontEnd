import React, { useState, useEffect } from "react";

//@ MUI Import

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { IconButton, InputBase } from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";

import makeStyles from "@material-ui/core/styles/makeStyles";

// import useTheme from "@material-ui/core/styles/makeStyles";

import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import Edit from "@material-ui/icons/Edit";
import Save from "@material-ui/icons/Save";

//@UI
import { Header, Footer, LandScape } from "../../components/ui";

//@API

import { useAllLocations } from "../../components/context/AllLocationsContext";
import { createNewLocation, getAllServices } from "../../apiCalls/apiCalls";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainGrind: {},

  listGrid: {},

  formPaper: {
    width: "80em",
    height: "40em",
  },

  formGrid: {
    width: "30em",
  },

  form: {
    margin: "2em",
  },

  saveButton: {
    backgroundColor: "#7CEC9F",
  },

  addButton: {
    width: "21em",
    backgroundColor: "#ffff",
  },
  searchBox: {
    width: "18em",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },

  modalPaper: {
    position: "absolute",
    width: 400,
    border: "2px solid #000",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

export default function Locations() {
  // ** @ All Variables
  const classes = useStyles();

  // ** @ All States

  const { allLocations, setAllLocations } = useAllLocations();

  const [location, setLocation] = useState({
    name: "",
    services: [],
    address: {
      street: "",
      number: "",
      cep: "",
    },
  });

  const [selectedIndex, setSelectedIndex] = useState();

  const [services, setServices] = useState();

  const [selectedServices, setselectedServices] = useState([]);

  const [editService, setEditService] = useState({
    isOpen: false,
    service: "",
  });

  //** Efects

  useEffect(() => {
    getAllServices().then((response) => {
      setServices(response);
    });
  }, []);

  // ** @ All Funciotn

  const handleCreateNewLocation = () => {
    const locationWithouServices = {
      ...location,
      services: selectedServices,
    };

    setLocation(locationWithouServices);

    createNewLocation(locationWithouServices).then((response) =>
      console.log(response)
    );
  };

  const handleLocation = (name) => (event) => {
    const value = event.target.value;

    setLocation({ ...location, [name]: value });
  };

  const handleLocationAddress = (name) => (event) => {
    const value = event.target.value;

    //The way bellow we update nested objects
    setLocation({
      ...location,
      address: { ...location.address, [name]: value },
    });
  };

  const handleSelectedItem = (event, index) => {
    setSelectedIndex(index);
  };

  const handleToggleCheckedService = (value) => () => {
    const currentIndex = selectedServices.indexOf(value); // --> it returns the index of the value or -1 if not find it
    const newServices = [...selectedServices];

    console.log(newServices);

    currentIndex === -1
      ? newServices.push(value) // --> if not found put it
      : newServices.splice(currentIndex, 1); //--> alse Remove - Thats toggling

    setselectedServices(newServices);
  };

  const handleModal = (service) => {
    setEditService({
      isOpen: !editService.isOpen,
      service: service,
    });
  };

  const handleChangeModalService = (value) => {
    setEditService({ ...editService, service: value });
  };

  // ** @ Render
  // **! Transform into a FizedSixze List
  // OverFlow gives te scrolling option to the ist
  const listServices = (
    <List style={{ maxWidth: "30em", maxHeight: 300, overflow: "auto" }}>
      {services ? (
        services.data.services.map((service) => {
          return (
            <>
              <ListItem component={Button} key={service._id}>
                <ListItemText style={{ marginRight: "3em" }}>
                  {service.name}
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleModal(service.name)}>
                    <Edit />
                  </IconButton>
                  <Checkbox
                    edge="end"
                    onChange={handleToggleCheckedService(service._id)}
                    checked={selectedServices.indexOf(service._id) != -1} //--> if contains in the due array, returns true, els false
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </>
          );
        })
      ) : (
        <h1>Loading</h1>
      )}
    </List>
  );

  const listLocations = (
    <List>
      {allLocations ? (
        allLocations.data.places.map((location) => {
          return (
            <>
              {" "}
              <ListItem
                selected={selectedIndex === location._id}
                onClick={(event) => {
                  handleSelectedItem(event, location._id);
                  console.log(location);
                  setLocation({
                    name: location.name,
                    services: [],
                    address: {
                      street: location.hasOwnProperty("address") //This property checks if there is a property in the due object
                        ? location.address.street
                        : "Não cadastrado",
                      number: location.hasOwnProperty("address.number")
                        ? location.address.number
                        : "Não cadastrado",

                      cep: location.hasOwnProperty("adress.data")
                        ? location.data.cep
                        : "Não cadastrado",
                    },
                  });
                }}
                button
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
      <>
        <ListItem>
          <ListItemText>{location.name}</ListItemText>
        </ListItem>
      </>
    </List>
  );

  const cadForm = (
    <>
      <Paper className={classes.formPaper}>
        <Grid container direction="row" justify="space-evenly">
          <Grid className={classes.formGrid} item>
            <form className={classes.form}>
              <Grid item container direction="column">
                <h1>Inserir nova unidade</h1>
                Unidade :{" "}
                <TextField
                  onChange={handleLocation("name")}
                  name="name"
                  variant="outlined"
                  value={location.name}
                />
                CEP :{" "}
                <TextField
                  onChange={handleLocationAddress("cep")}
                  name="cep"
                  variant="outlined"
                  value={location.address.cep}
                />
                RUA :{" "}
                <TextField
                  onChange={handleLocationAddress("street")}
                  name="street"
                  variant="outlined"
                  value={location.address.street}
                />
                Número :{" "}
                <TextField
                  onChange={handleLocationAddress("number")}
                  name="number"
                  variant="outlined"
                  value={location.address.number}
                />
              </Grid>

              <Grid item container justify="space-between">
                <Button
                  className={classes.saveButton}
                  onClick={() => {
                    handleCreateNewLocation();
                  }}
                  style={{
                    marginTop: "1em",
                  }}
                >
                  Salvar
                </Button>

                <Button
                  // onClick={() => handleCreateNewLocation()}
                  style={{
                    marginTop: "1em",
                    backgroundColor: "#FBD28B",
                  }}
                >
                  Editar
                </Button>
              </Grid>
            </form>
          </Grid>

          <Grid style={{ marginTop: "2em" }} item>
            <Grid>
              <h1>Escolher serviços</h1>
              <Paper elevation={2}>{listServices}</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );

  const serviceModal = (props) => {
    return (
      <Modal open={editService.isOpen} onClose={handleModal}>
        <Paper className={classes.modalPaper}>
          <TextField
            value={editService.service}
            onChange={(event, value) => handleChangeModalService(value)}
            style={{ width: "20em", marginLeft: "2em" }}
          ></TextField>
          <IconButton>
            <Save />
          </IconButton>
        </Paper>
      </Modal>
    );
  };

  return (
    <>
      <Header />
      <Grid container style={{ marginTop: "2em" }} direction="row">
        <Grid item>
          <Paper>
            <Grid container direction="column" alignItems="center">
              <TextField className={classes.searchBox} variant="outlined" />
              <br />
              <Button
                className={classes.addButton}
                onClick={() =>
                  setLocation({
                    name: "",
                    services: [],
                    address: {
                      street: "",
                      number: "",
                      cep: "",
                    },
                  })
                }
                color="primary"
              >
                <AddCircleOutline />
              </Button>
            </Grid>
            {listLocations}
          </Paper>
        </Grid>

        <Grid style={{ marginLeft: "10em" }} item>
          {cadForm}
        </Grid>

        {serviceModal()}
      </Grid>
    </>
  );
}
