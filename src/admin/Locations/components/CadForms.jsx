// Aqui eu to usando sempre Props... Mas o interesante [e usar Contex API]

import React, { useState, useEffect, useRef } from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import  Update  from "@material-ui/icons/Update";
import  Add  from "@material-ui/icons/Add";

import { getAllServices } from "../../../apiCalls/apiCalls";

import CadLocation from "./UpdateLocation";
import CadServices from "./CadServices";
import CadNewLocation from "./CadNewLocation";

const useStyles = makeStyles((theme) => ({
  formPaper: {
    width: "50em",
    height: "42em",
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

  tab: {
    textTransform: "none", // Because Material UI leaves by default all upercase
    minWidth: "50%",
    fontSize: "1rem",
    fontWeight: 700,
  },
}));

export default function CadForms(props) {
  const [value, setValue] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);


  const classes = useStyles();

  const tabItens = [
    { tabName: "Editar undade", value: 0,  icon: <Update />  },
    { tabName: "Nova Unidade", value: 1, icon: <Add /> },
  ];

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const tabs = (
    <Tabs value={value}>
      {tabItens.map((tab) => {
        return (
          <>
            <Tab
              label={tab.tabName}
              onClick={() => handleChange(tab.value)}
              className={classes.tab}
              icon={tab.icon}
            />
          </>
        );
      })}
    </Tabs>
  );

  return (
    <>
      <Paper className={classes.formPaper}>
        <Grid>{tabs}</Grid>

        <Grid container direction="column">
          {value === 0 ? (
            <>
              <Grid item>
                <CadLocation
                  listItem={props.listItem}
                  selectedServices={selectedServices}
                />
              </Grid>

              <Grid item>
                <CadServices
                  listItem={props.listItem}
                  selectedServices={(value) => setSelectedServices(value)}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item>
                <CadNewLocation
                  listItem={props.listItem}
                  selectedServices={selectedServices}
                />
              </Grid>

              <Grid item>
                <CadServices />
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </>
  );
}
