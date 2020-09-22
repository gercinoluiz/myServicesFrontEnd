import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import AddCircleOutline from "@material-ui/icons";

import React, { useState, useEffect, useRef } from "react";

export default function CadForms() {


  // State  
  const [services, setServices] = useState();


 // Effect
  useEffect(() => {
    getAllServices().then((response) => {
      setServices(response);
    });
  }, []); //editService, setEditService, newService, setNewService

  return (
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
                  {
                    setTimeout(() => {
                      inputServiceRef.current.focus(); //--> I use this time out because when I clicj the button the input is not rendered yet
                    }, 100);
                  }
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
}
