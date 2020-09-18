import React from "react";
import App from "./App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Locations from "./admin/Locations/Locations";

// Theme Context
import { useTheme } from "./components/context/ThemeContext";


//MUI Theming
import { ThemeProvider } from "@material-ui/core";
import ThemeLight from "./styles/ThemeLight";
import ThemeDark from "./styles/ThemeDark";



export default function Routes() {

  const { theme, setTheme } = useTheme();

  return (

    <ThemeProvider theme={theme ? ThemeLight : ThemeDark}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        {/* <Route path="/manager" exact component={} /> */}
        {/* <Route path="/manager/services" exact component={} /> */}
        <Route path="/manager/locations" exact component={Locations} />


      </Switch>
    </BrowserRouter>
    </ThemeProvider>
  );
}
