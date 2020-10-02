import React, { useState, useEffect, useRef } from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import AddCircleOutline from "@material-ui/icons/AddCircleOutline";

import { createNewLocation, deleteLocation } from "../../../apiCalls/apiCalls";
import CadServices from "./CadServices";

const useStyles = makeStyles((theme) => ({
  formPaper: {
    width: "50em",
    height: "30em",
  },

  txtName: {
    width: "35em",
    margin: "0.5em",

  },

  txtCep: {
    width: "35em",
    margin: "0.5em",
  },

  txtCidade: {
    width: "10em",
    margin: "0.5em",
  },

  saveButton: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffff",
    margin: "1em",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  deleteButton: {
    backgroundColor: "#D63031",
    color: "#ffff",
    fontWeight: "bold",
    margin: "1em",
    "&:hover": {
      backgroundColor: "#D63031",
    },
  },

  deleteModal: {
    position: "absolute",
    width: 400,

    border: "2px solid #000",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  newLocationButton: {
    margin: "1em",
  },
}));

export default function CadLocation(props) {
  const classes = useStyles();

  const [locationDeleteModal, setLocationDeleteModel] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [snackBarType, setSnackbarType] = useState("");
  const [inputFocus, setInputFoucus] = useState(0);

  const [newLocation, setNewLocation] = useState({
    name: "",
    services: [],
    address: {
      street: "",
      state: "",
      city: "",
      description: "",
    },
  });

  const handleDeleteLocation = (locationId) => {
    deleteLocation(locationId).then((response) => {
      if (response.status === "success") {
        setOpenSuccess(true);

        setTimeout(() => {
          handleCloseModal();
        }, 2000);

        setSnackbarType("success");

        window.location.reload(false);
      } else {
        setOpenSuccess(true);

        setTimeout(() => {
          handleCloseModal();
        }, 2000);

        setSnackbarType("success");
        setSnackbarType("error");
      }
    });
  };

  const handleCloseSnackBar = () => {
    setOpenSuccess(false);
  };

  const handleCloseModal = () => {
    setLocationDeleteModel(false);
  };

  const modal = (locationName) => {
    return (
      <Modal onClose={handleCloseModal} open={locationDeleteModal}>
        <Paper className={classes.deleteModal}>
          <Grid>
            <Typography>
              Deseja realmente deletar:{" "}
              <span style={{ fontWeight: "bold" }}>{props.listItem.name}</span>
            </Typography>
            <Button
              onClick={() => handleDeleteLocation(props.listItem._id)}
              className={classes.saveButton}
            >
              Confirmar
            </Button>

            <Button className={classes.deleteButton} onClick={handleCloseModal}>
              Cancelar
            </Button>
          </Grid>
        </Paper>
      </Modal>
    );
  };

  const deleteSnackBar = () => {
    return (
      <Snackbar
        open={openSuccess}
        onClose={handleCloseSnackBar}
        autoHideDuration={2000}
      >
        <MuiAlert onClose={handleCloseSnackBar} severity={snackBarType}>
          {snackBarType}
        </MuiAlert>
      </Snackbar>
    );
  };

  const handleCreateLocation = (name) => (event) => {
    const value = event.target.value;

    if (name === "name") {
      setNewLocation({ ...newLocation, [name]: value });
    } else {
      setNewLocation({
        ...newLocation,
        address: { ...newLocation.address, [name]: value },
      });
    }
  };

  const handleSaveNewLocation = () => {
    // you cant save the state right here, you aways have to put the variable first

    const createdLocation = {
      ...newLocation,
      services: props.selectedServices,
    };

    createNewLocation(createdLocation).then((response) => {
      console.log(response);
      if (response) {
        if ((response.status = "success")) {
          setSnackbarType("success");
          setOpenSuccess(true);
          // window.location.reload(false); // Old fashioned - watch this
        }
      } else {
        setSnackbarType("error");
        setOpenSuccess(true);
      }
      //   }
    });
  };

  //use REF

  const locationInput = useRef();

  //**! It is wrong

  useEffect(() => {
    if (inputFocus === 1) {
      locationInput.current.focus();
    }
  }, [inputFocus, setInputFoucus]);

  return (
    <>
      <Grid
        container
        style={{ width: "45em", marginLeft: "1em" }}
        direction="column"
      >
        <Grid item>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Typography>Unidade :</Typography>{" "}
            <TextField
              className={classes.txtName}
              variant="outlined"
              name="name"
              onChange={handleCreateLocation("name")}
              ref={locationInput}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Typography>Endereço :</Typography>{" "}
            <TextField
              className={classes.txtName}
              variant="outlined"
              justify="space-between"
              name="street"
              onChange={handleCreateLocation("street")}
            />
          </Grid>
        </Grid>
     
        <Grid item>
          <Grid item container justify="flex-end">
            <Button
              onClick={() => {
                handleSaveNewLocation();
              }}
              className={classes.saveButton}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {modal()}
      {deleteSnackBar()}
    </>
  );
}
