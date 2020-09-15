import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ServiceDialogProvider from "./components/context/ServiceDialogContext";
import ThemeChangeProvider from "./components/context/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <ServiceDialogProvider>
      <ThemeChangeProvider>
        <App />
      </ThemeChangeProvider>
    </ServiceDialogProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
