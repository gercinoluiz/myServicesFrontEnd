import React, { useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Divider, makeStyles, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { useTheme, useMediaQuery } from "@material-ui/core";

// import { AddCircleOutline } from "@material-ui/icons/AddCircleOutline";

import { getAllServices } from "../../../apiCalls/apiCalls";

const useStyles = makeStyles((theme) => ({
  list: {
    overflow: "auto",
    maxWidth: "20em",
    width: "20em",
    height: "16em",
  },

  button: {
    margin: "1em",
  },
  paper: {
    height: "20",
    width: "22em",
  },

  gambiarra: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "2em",
    },
  },

  text: {
    fontSize: "1.5em",
    fontFamily: "Roboto",
    fontWeight: "Bold",
    color: theme.palette.primary.main,
    marginLeft: "3em",
  },
}));

const CadServices = (props) => {
  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  // State
  const [services, setServices] = useState();
  const [checked, setChecked] = useState([]);

  const handleChecked = (e, value) => {
    const currentIndex = checked.indexOf(value);

    const newArray = [...checked];

    if (currentIndex === -1) {
      newArray.push(value);
    } else {
      newArray.splice(currentIndex, 1);
    }

    setChecked(newArray);
  };
  //SENDING THE SELECTED SERVICES BACK
  if (props.selectedServices) {
    props.selectedServices(checked);
  }
  // Effect
  useEffect(() => {
    getAllServices().then((response) => {
      setServices(response);
    });
  }, []); //editService, setEditService, newService, setNewService

  console.log({ checked });

  return (
    <>
      <Grid
        container
        direction={matches ? "column" : "row"}
        justify="space-around"
        className={classes.gambiarra}
      >
        <Grid item>
          <Typography className={classes.text} variant="h6">
            Serviços nesta undiade
          </Typography>

          <Paper className={classes.paper} elevation={1}>
            <List className={classes.list}>
              {props.listItem ? (
                props.listItem.services.map((service, index) => {
                  return (
                    <>
                      <ListItem key={index} button>
                        <ListItemText>{service.name}</ListItemText> <Checkbox />
                      </ListItem>

                      <Divider />
                    </>
                  );
                })
              ) : (
                <h1>Vazio</h1>
              )}
            </List>
          </Paper>
        </Grid>
        <Divider />

        <Grid item>
          <Typography className={classes.text} variant="h6">
            Todos Serviços
          </Typography>{" "}
          <Paper className={classes.paper} elevation={1}>
            <List className={classes.list}>
              {services ? (
                services.data.services.map((service, index) => {
                  return (
                    <>
                      <ListItem
                        onClick={(e) => {
                          handleChecked(e, service._id);
                        }}
                        key={index}
                        button
                      >
                        <ListItemText>{service.name}</ListItemText>
                        <Checkbox />
                      </ListItem>
                      <Divider />
                    </>
                  );
                })
              ) : (
                <h1>Loading...</h1>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(CadServices);

// //tranferList

// const [checked, setCheck] = useState([]);
// const [left, setLeft] = useState({
//   data: {
//     services: [
//       { name: "1", _id: "1234165" },
//       { name: "2", _id: "1234165" },
//       { name: "3", _id: "1234165" },
//     ],
//   },
// });
// const [right, setRight] = useState({
//   data: {
//     services: [
//       { name: "a", _id: "1234165" },
//       { name: "b", _id: "1234165" },
//       { name: "c", _id: "1234165" },
//     ],
//   },
// });
// console.log(left);
// const leftCheckd = intersection(checked, left.data.services);
// const rightChecked = intersection(checked, right.data.services);

// const handleTogleList = (value) => () => {
//   const currenIndex = checked.indexOf(value);
//   const newChecked = [...checked];

//   console.log({ currenIndex });

//   if (currenIndex === -1) {
//     newChecked.push(value);
//   } else newChecked.splice(currenIndex, 1);

//   setCheck(newChecked);
// };
// console.log(checked);

// const allRight = () => {
//   setRight(right.data.services.concat(left.data.services));
//   setLeft([]);
// };

// const allLeft = () => {
//   setLeft(left.data.services.concat(right.data.services));
//   setRight([]);
// };

// const handleCheckedRight = () => {
//   setRight(right.data.services.concat(leftCheckd));
//   setLeft(not(left.data.services, leftCheckd));
//   setCheck(not(checked, leftCheckd));
// };

// const handleChekedLeft = () => {
//   setLeft(left.data.services.concat(rightChecked));
//   setRight(not(right.data.services, rightChecked));
//   setCheck(not(checked, rightChecked));
// };

// function not(a, b) {
//   return a.filter((value) => b.indexOf(value) === -1);
// }

// function intersection(a, b) {
//   return a.filter((value) => b.dat.indexOf(value) !== -1);
// }
