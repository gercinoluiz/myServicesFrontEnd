import React, { useEffect, useState } from "react";
import AppBarFooter from "./AppBarFooter";
import Header from "./Header";
import { getLocationsByService } from "../../apiCalls/apiCalls";

import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  makeStyles,
} from "@material-ui/core";

import DateRange from "@material-ui/icons/DateRange";
import Room from "@material-ui/icons/Room";

import MenuBook from "@material-ui/icons/MenuBook";
import Info from "@material-ui/icons/Info";
import EventAvailable from "@material-ui/icons/EventAvailable";

const useStyles = makeStyles((theme) => ({
  Card: {
    minWidth: 300,
    maxWidth: 450,
    marginTop:"1em",
    
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

  iconInfo:{
    color: theme.palette.primary.main,
    fontSize: "1.5em",
  },

  cardTypography: {
    fontSize: "0.8em",
    color:""
  },
  iconsGrid: {
    marginLeft: "1em",
  },

}));

export default function LandScape() {
  const classes = useStyles();

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocationsByService().then((locations) => {
      setLocations(locations.data.places);
    });
  }, []);

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
    </div>
  );
}
