import React, { useState } from "react";

//UI Components
import { Header, LandingPage } from "./components/ui/";
import AppBarFooter from "./components/ui/AppBarFooter";

function App() {
  const [service, setService] = useState("");
  console.log("APP", service);

  return (
    <>
      <Header service={service} />
      <LandingPage getService={(value) => setService(value)} />
      <AppBarFooter />
    </>
  );
}

export default App;
