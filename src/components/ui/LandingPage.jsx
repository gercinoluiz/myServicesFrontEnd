import React, { useEffect, useState } from "react";
import AppBarFooter from "./AppBarFooter";
import Header from "./Header";
import { getLocationsByService } from "../../apiCalls/apiCalls";

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
    minWidth: 300,
    maxWidth: 450,
    marginTop: "1em",
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

  const { openServiceDialog, setOpenServiceDialog } = useServiceDialog();

  useEffect(() => {
    getLocationsByService()
      .then((locations) => {
        setLocations(locations.data.places);
      })
      .catch(() => {
        //FIX: Come back Here
        return <h1>Erro</h1>;
      });
  }, []);

  // =================================Components=======================================

  const locationsCards = locations.map((location) => {
    return (
      <div>
        <Grid>
          <Card className={classes.Card}>
            <CardContent>
              <Typography className={classes.title}>{location.name}</Typography>
              <Typography className={classes.address}>
                R. Nossa Sra. do Bom Conselho, 65
              </Typography>
              <Typography className={classes.distance}>
                Ditancia: {location.distance.toString().substring(0, 2)} KM
              </Typography>
            </CardContent>

            <CardActions>
              <Grid container justify="space-between" alignItems="center">
                <Grid className={classes.iconsGrid} item>
                  <Grid item container alignItems="center" direction="column">
                    <Typography>
                      <Info className={classes.iconInfo} />
                    </Typography>
                    <Typography className={classes.cardTypography}>
                      MAIS DETALHES
                    </Typography>
                  </Grid>
                </Grid>
                <Grid className={classes.iconsGrid} item>
                  <Grid item container alignItems="center" direction="column">
                    <Typography>
                      <EventAvailable className={classes.iconCalendar} />
                    </Typography>
                    <Typography className={classes.cardTypography}>
                      Necessita Agendamento
                    </Typography>
                  </Grid>
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
        <ListItem button>
          <ListItemText>RG</ListItemText>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText>CPF</ListItemText>
        </ListItem>
      </List>
    </Dialog>
  );

  return (
    <div>
      {locationsCards}
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
      reprehenderit dicta omnis eum voluptate perspiciatis ex mollitia magnam
      ullam aut, dolorum minus deleniti odio atque tenetur quas? Possimus ipsum
      modi ut eligendi sunt soluta itaque deleniti eum quae, repellat velit quis
      accusantium harum, ullam numquam quaerat ducimus vitae qui? Saepe enim
      nesciunt earum. Magnam, veritatis id maiores nostrum in nobis. Sit quam
      explicabo sunt sint esse consequatur unde tenetur, odio alias nihil iste
      totam, maiores suscipit neque officiis nisi hic, deserunt obcaecati
      praesentium. Vitae ex voluptatum asperiores, culpa quod rerum assumenda
      amet eos animi cupiditate corporis at vero sapiente ratione accusamus
      distinctio, ducimus porro facilis fugiat. Distinctio eligendi, deserunt
      maiores molestias illum ipsum unde nobis id tempore repellat mollitia fuga
      sapiente! Odio ducimus illo nisi molestiae, numquam cum nihil inventore,
      beatae dignissimos nemo esse quisquam, vero tenetur cumque doloremque?
      Excepturi, ea nulla sint dolore mollitia ad nostrum, incidunt voluptatem,
      quae ullam consectetur corrupti sapiente debitis odit distinctio
      doloremque alias possimus. Eius dolorem quis sequi ad aspernatur eaque
      amet odit accusantium architecto, quas exercitationem consequuntur
      voluptas mollitia et nemo ab doloremque ipsum ut saepe esse quidem libero.
      Numquam maxime aliquid voluptates nisi sapiente tenetur rem labore sint
      debitis veritatis, neque eos.
      {serviceDialog}
    </div>
  );
}
