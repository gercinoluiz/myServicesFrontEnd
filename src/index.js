// import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import ServiceDialogProvider from "./components/context/ServiceDialogContext";
import ThemeChangeProvider from "./components/context/ThemeContext";
import Routes from "./Routes";
// import LocationsProvider from "./components/context/AllLocationsContext";

ReactDOM.render(
  <React.StrictMode>
    {/* <LocationsProvider> */}
    <ServiceDialogProvider>
      <ThemeChangeProvider>
        <Routes />
      </ThemeChangeProvider>
    </ServiceDialogProvider>
    {/* </LocationsProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
