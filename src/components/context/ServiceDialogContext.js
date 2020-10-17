import React, { useState, useContext } from "react";

const serviceDialogContext = React.createContext();

export default function ServiceDialogProvider({ children }) {
  const [openServiceDialog, setOpenServiceDialog] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <serviceDialogContext.Provider
      value={{ openServiceDialog, setOpenServiceDialog, openInfo, setOpenInfo }}
    >
      {children}
    </serviceDialogContext.Provider>
  );
}

export const useServiceDialog = () => {
  const context = useContext(serviceDialogContext);

  const {
    openServiceDialog,
    setOpenServiceDialog,
    openInfo,
    setOpenInfo,
  } = context;

  return { openServiceDialog, setOpenServiceDialog, openInfo, setOpenInfo };
};
