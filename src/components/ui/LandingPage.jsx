import React, { useEffect, useState } from "react";
// import AppBarFooter from "./AppBarFooter";
// import Header from "./Header";
import {
  getLocationsByService,
  getAllServices,
  getAllNearLocations,
} from "../../apiCalls/apiCalls";

import { useServiceDialog } from "../context/ServiceDialogContext";

import {
  Grid,
  Card,
  // CardActionArea,
  CardContent,
  // CardMedia,
  // CardActions,
  Typography,
  makeStyles,
  List,
  Button,
} from "@material-ui/core";

// import sp from "../../images/sp.png";

import Dialog from "@material-ui/core/Dialog";
// import Button from "@material-ui/core/Button";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";

// import { useTheme } from "@material-ui/core";

// import DateRange from "@material-ui/icons/DateRange";
// import Room from "@material-ui/icons/Room";
import CloseIcon from "@material-ui/icons/Close";
import Person from "@material-ui/icons/Person";

// import MenuBook from "@material-ui/icons/MenuBook";
// import Info from "@material-ui/icons/Info";
// import EventAvailable from "@material-ui/icons/EventAvailable";
import Search from "@material-ui/icons/Search";

import map from "../../images/map.png";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    ...theme.mixins.toolBar,
    height: "4em",
  },
  about: {
    width: "90vw",
    maxWidth: "1000px",
  },

  Card: {
    width: "23em",

    marginTop: "0.5em",

    [theme.breakpoints.up("lg")]: {
      width: "800px",
    },

    [theme.breakpoints.down("md")]: {
      width: "700px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "380px",
    },

    [theme.breakpoints.down("xs")]: {
      width: "335px",
    },
  },

  title: {
    fontSize: "1em",
    fontFamily: "Roboto",
    fontWeight: "Bold",
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9em",
    },
  },

  address: {
    fontSize: "0.9em",
    fontFamily: "Roboto",
    color: theme.palette.primary.secondaryText,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8em",
    },
  },

  distance: {
    fontSize: "1.5em",
    fontFamily: "Roboto",
    marginTop: "1em",
    fontWeight: "bold",
    color: "black",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5em",
    },
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
    height: "2em",
    padding: "8px",
  },

  mainGrid: {
    position: "absolute",

    left: "50%",
    transform: "translate(-50%)",

    marginBottom: "4em",
    [theme.breakpoints.down("md")]: {
      marginLeft: "5em",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0em",
    },
  },

  typographyH1: {
    ...theme.typography.h1,
  },

  gridInfo: {
    width: "500px",
    [theme.breakpoints.down("xs")]: {
      width: "200px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "200px",
    },
  },
  gridDistance: {
    width: "5em",
    height: "4em",
    backgroundImage: `url(${map})`,
    opacity: "1",
    color: "black",
    borderRadius: 5,
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      width: "5em",
      height: "4em",
    },
  },

  warning: {
    fontSize: "0.9em",
    color: theme.palette.primary.contrastText,

    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7em",
    },
  },

  ditanceBellow: {
    fontSize: "1em",
    color: theme.palette.primary.contrastText,

    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9em",
      fontWeight: "bold",
    },
  },

  serviceModal: {
    position: "absolute",
    display: "flex",
    width: "80%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    alignItems: "center",
    justifyContent: "center",
  },

  serviceModalGrid: {
    width: "80%",
    margin: "3px",
  },
  serviceModalTypography: {
    color: theme.palette.primary.contrastText,
    textAlign: "center",
  },

  serviceModalButton: {
    width: "55%",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontWeight: "bold",
  },
  servicoOnlineTypograph: {
    color: "#1BCA9B",
    fontSize: "15px",
    marginRight: "3px",
  },

  schedule: {
    color: theme.palette.primary.main,
    fontSize: "13px",
    fontWeight: "bold",
    padding: "5px",
  },

  gridSite: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "16px",
    marginTop: "10px",
  },
}));

//**Stil Study it  */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//=========================MAIN FUNCION=====================================
export default function LandScape(props) {
  //=====================Variables==========================================
  const classes = useStyles();

  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up("md"));

  //========================Hooks===========================================

  const [locations, setLocations] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [latlng, setLatlng] = useState("");
  const [openServiceModal, setOpenServiceModal] = useState(false);

  //Context

  const {
    openServiceDialog,
    setOpenServiceDialog,
    openInfo,
  } = useServiceDialog();

  // GET Nearst Location by Service
  useEffect(() => {
    //getting location   ---- GOTTA BE IN USEEFFECT AND USING STATE ---> https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
    // In use Effect, as it is a callback, it will await the response of the browser
    // If I would put at the middle of my code, as I did befoere, it would render first than getting position

    navigator.geolocation.getCurrentPosition((position) => {
      setLatlng(`${position.coords.latitude}, ${position.coords.longitude}`);

      // latlng
      // ?
      getAllNearLocations(latlng)
        .then((locations) => {
          console.log({ locations });
          setLocations(locations.data.places);
        })
        .catch(() => {
          //FIX: Come back Here
          return <h1>Error</h1>;
        });
      // :
      //  getAllLocations()
      //     .then((locations) => {
      //       console.log({ locations });
      //       setLocations(locations.data.places);
      //     })
      //     .catch(() => {
      //       //FIX: Come back Here
      //       return <h1>Error</h1>;
      //     });
    });
  }, [latlng]);

  // GET ALL SERVICES

  useEffect(() => {
    getAllServices().then((services) => {
      setServices(services.data.services);
    });
  }, [openServiceDialog, setOpenServiceDialog]);

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

  const locationsCards = locations.map((location, index) => {
    return (
      <div key={index}>
        <a
          key={index}
          style={{ textDecoration: "none" }}
          rel="noopener noreferrer"
          target="_blank"
          href={`https://www.google.com/maps/dir/?api=1&origin=${latlng}&destination=${location.location.coordinates[0]}, ${location.location.coordinates[1]}`}
        >
          <Card className={classes.Card}>
            <CardContent>
              <Grid container justify="space-around">
                <Grid item className={classes.gridInfo}>
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
                  <Grid item className={classes.gridDistance}>
                    <Typography className={classes.distance}>
                      {location.distance
                        ? location.distance.toString().substring(0, 2)
                        : ""}{" "}
                      KM
                    </Typography>
                    <Typography>Distância</Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="column"
                  className={classes.warningGrid}
                >
                  <Typography className={classes.warning}>
                    * Verifique a política de agendamento da unidade no site.
                  </Typography>
                  <Typography className={classes.warning}>
                    * Clique para mais abrir o mapa.
                  </Typography>
                </Grid>

                {location.webSite ? (
                  <Grid className={classes.gridSite}>
                    <Typography className={classes.schedule}>
                      <a
                        style={{ textDecoration: "none", color: "#fff" }}
                        rel="noopener noreferrer"
                        target="_blank"
                        href={location.webSite}
                      >
                        {" "}
                        Abrir site de agendamento{" "}
                      </a>
                    </Typography>{" "}
                  </Grid>
                ) : null}
              </Grid>
            </CardContent>
          </Card>
        </a>
      </div>
    );
  });

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
        <Toolbar style={{ paddingLeft: "0px" }}>
          <IconButton
            color="inherit"
            onClick={() => {
              setOpenServiceDialog(false);
              setFilteredServices([]);
            }}
            style={{ marginLeft: "5px" }}
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
          filteredServices.map((service, index) => {
            return (
              <div key={index}>
                <ListItem
                  button
                  onClick={(e) => {
                    handleSearchLocationByService(e, service._id);
                    setOpenServiceDialog(false);
                    setFilteredServices([]);
                    props.getService(service);
                    if (service.isOnline) {
                      setOpenServiceModal(true);
                    }
                  }}
                >
                  <ListItemText>{service.name}</ListItemText>
                  {service.isOnline ? (
                    <>
                      <Typography className={classes.servicoOnlineTypograph}>
                        Serviço Online{" "}
                      </Typography>
                      <Person style={{ color: "#1BCA9B" }} />
                    </>
                  ) : null}
                </ListItem>
                <Divider />
              </div>
            );
          })
        ) : services ? (
          services.map((service, index) => {
            return (
              <div key={index}>
                <ListItem
                  button
                  key={index}
                  onClick={(e) => {
                    handleSearchLocationByService(e, service._id);
                    setOpenServiceDialog(false);
                    props.getService(service);

                    if (service.isOnline) {
                      setOpenServiceModal(true);
                    }
                  }}
                >
                  <ListItemText>{service.name}</ListItemText>
                  {service.isOnline ? (
                    <>
                      <Typography className={classes.servicoOnlineTypograph}>
                        Serviço Online{" "}
                      </Typography>
                      <Person style={{ color: "#1BCA9B" }} />
                    </>
                  ) : null}
                </ListItem>
                <Divider />
              </div>
            );
          })
        ) : (
          <h1>Waiting</h1>
        )}
      </List>
    </Dialog>
  );

  const info = (
    <Grid className={classes.about}>
      <Typography variant="h3">Informações do Projeto: </Typography> <br />
      <Typography variant="h4">Funcionamento do aplicativo:</Typography>
      <Typography variant="body2">
        &ensp; Ao clicar na lupa de busca <Search />, no canto inferior direito,
        basta selecionar o serviço desejado, e o aplicativo retornará a unidade
        de atendimento ao público mais próxima à sua localização, desde que
        atenda o serviço selecionado.
      </Typography>
      <br />
      <Typography variant="h4">Intuito do Aplicativo:</Typography>
      <Typography variant="body2">
        &ensp;O Meu Serviço foi criado para facilitar a vida do cidadão quando
        precisar encontrar algum serviço realizado por alguma unidade de
        atendimento ao público, como Descomplica SP, Poupa Tempo, Cartórios,
        Bancos, INSS etc.
      </Typography>
      <br />
      {/* <Typography variant="h4">Intuito do projeto:</Typography>
      <Typography variant="body2">
      &ensp; Esse projeto foi realizado com intuito de fortalecer meus conhecimentos
        na stack MERN <span>MongoDB, Express, React e Node</span>, bem como meus
        conhecimentos em inglês, logo, as funções, comentários etc., são todos
        em inglês
      </Typography> */}
    </Grid>
  );

  const serviceModal = (
    <Modal
      disableAutoFocus
      open={openServiceModal}
      onClose={() => setOpenServiceModal(false)}
      disableEnforceFocus
    >
      <Paper className={classes.serviceModal}>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.serviceModalGrid}
        >
          <Typography className={classes.serviceModalTypography}>
            O serviço escolhido pode ser realizado de forma{" "}
          </Typography>
          <Typography style={{ color: "#1BCA9B", fontWeight: "bold" }}>
            {" "}
            Online{" "}
          </Typography>
          <Typography style={{ fontSize: "12px", textAlign: "center" }}>
            Tente realizá-lo de forma online antes de ir a uma unidade de
            atendimento.
          </Typography>

          <Button
            onClick={() => setOpenServiceModal(false)}
            className={classes.serviceModalButton}
          >
            OK
          </Button>
        </Grid>
      </Paper>
    </Modal>
  );

  return (
    <div>
      <Grid className={classes.mainGrid}>
        {openInfo ? info : locationsCards}
      </Grid>

      {serviceDialog}
      {serviceModal}
    </div>
  );
}
