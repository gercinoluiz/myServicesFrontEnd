//*! RESOLVE THE SLOW INPUT THING

import React, { useState, useEffect, useRef } from "react";

//@ MUI Import
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
import { IconButton} from "@material-ui/core";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { useTheme } from "@material-ui/core";
// import useTheme from "@material-ui/core/styles/makeStyles";

import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import Edit from "@material-ui/icons/Edit";
import Save from "@material-ui/icons/Save";
import Delete from "@material-ui/icons/Delete";

//@UI
import { Header} from "../src/components/ui";

//@API
import { useAllLocations } from "../src/components/context/AllLocationsContext";
import {
  createNewLocation,
  getAllServices,
  updateService,
  createService,
  deleteService,
} from "../src/apiCalls/apiCalls";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainGrind: {},

  listGrid: {},

  formPaper: {
    padding: "3em",
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

function Locations() {
  // ** @ All Variables
  const classes = useStyles();

  const theme = useTheme();

  const matches = theme.breakpoints.down("lg");

  // ** @ All States

  const { allLocations } = useAllLocations();

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

  const [newService, setNewService] = useState("");

  const [newSericeModal, setNewServiceModal] = useState(false);

  //** REFS

  const inputServiceRef = useRef(null);

  //** Efects

  useEffect(() => {
    getAllServices().then((response) => {
      setServices(response);
    });
  }, [editService, setEditService, newService, setNewService]);

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

  const handleModal = (service, serviceId) => {
    setEditService({
      isOpen: !editService.isOpen,
      serviceId: serviceId,
      service: service,
    });
  };

  const handleChangeModalService = (value) => {
    setEditService({ ...editService, service: value });
  };

  const handleNewService = (value) => {
    setNewService(value);
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
                  <IconButton
                    onClick={() => {
                      deleteService(service._id);

                      setNewService(service.name);
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    onClick={() => handleModal(service.name, service._id)}
                  >
                    <Edit />
                  </IconButton>
                  <Checkbox
                    edge="end"
                    onChange={handleToggleCheckedService(service._id)}
                    checked={selectedServices.indexOf(service._id) !== -1} //--> if contains in the due array, returns true, els false
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

  function listLocations() {
    return (
      <List>
        {allLocations ? (
          allLocations.data.places.map((location, index) => {
            return (
              <>
                {" "}
                <ListItem
                  key={index}
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
  }

  const cadForm = (
    <>
      <Paper className={classes.formPaper}>
        <Grid container direction={matches ? "row" : "column"}>
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
                Endereço :{" "}
                <TextField
                  onChange={handleLocationAddress("street")}
                  name="street"
                  variant="outlined"
                  value={location.address.street}
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

                <Button
                  // onClick={() => handleCreateNewLocation()}
                  style={{
                    marginTop: "1em",
                    backgroundColor: "#E8290B",
                  }}
                >
                  Deletar
                </Button>
              </Grid>
            </form>
          </Grid>

          <Grid style={{ marginTop: "2em" }} item>
            <Grid item container direction="column" alignConten="center ">
              <h1>Escolher serviços</h1>
              <Paper elevation={2}>{listServices} </Paper>
              <Button
                onClick={() => {
                  setNewServiceModal(true);
                  
                    setTimeout(() => {
                      inputServiceRef.current.focus(); //--> I use this time out because when I clicj the button the input is not rendered yet
                    }, 100);
                  
                }}
              >
                <AddCircleOutline />
              </Button>
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
            onChange={(e) => handleChangeModalService(e.target.value)}
            style={{ width: "20em", marginLeft: "2em" }}
          ></TextField>
          <IconButton>
            <Save
              onClick={() => {
                updateService(editService.serviceId, editService.service);
                setEditService({ isOpen: false });
              }}
            />
          </IconButton>
        </Paper>
      </Modal>
    );
  };

  const serviceAddModal = (props) => {
    return (
      <Modal open={newSericeModal} onClose={() => setNewServiceModal(false)}>
        <Paper className={classes.modalPaper}>
          <TextField
            onChange={(e) => handleNewService(e.target.value)}
            style={{ width: "20em", marginLeft: "2em" }}
            inputRef={inputServiceRef}
          ></TextField>
          <IconButton>
            <Save
              onClick={() => {
                createService(newService).then((response) =>
                  setNewService(...newService)
                );
                setNewServiceModal(false);
              }}
            />
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
            {listLocations()}
          </Paper>
        </Grid>

        <Grid style={{ marginLeft: "5em" }} item>
          {cadForm}
        </Grid>

        {serviceModal()}
        {serviceAddModal()}
      </Grid>
    </>
  );
}

export default Locations;
