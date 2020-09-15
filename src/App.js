import React from "react";

// Theme Context
import { useTheme } from "./components/context/ThemeContext";

//MUI Theming
import { ThemeProvider } from "@material-ui/core";
import ThemeLight from "./styles/ThemeLight";
import ThemeDark from "./styles/ThemeDark";

//UI Components
import { Header, Footer, LandScape } from "./components/ui/";
import AppBarFooter from "./components/ui/AppBarFooter";

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeProvider theme={theme ? ThemeLight : ThemeDark}>
     
        <>
          <Header />

          <LandScape />
          <AppBarFooter />
        </>
   
    </ThemeProvider>
  );
}

export default App;
