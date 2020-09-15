import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeChangeProvider from "./components/context/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeChangeProvider>
      <App />
    </ThemeChangeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
