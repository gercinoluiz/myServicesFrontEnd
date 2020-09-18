import React, { useState, useContext } from "react";

const serviceDialogContext = React.createContext();

export default function ServiceDialogProvider({ children }) {
  const [openServiceDialog, setOpenServiceDialog] = useState(false);

  return (
    <serviceDialogContext.Provider
      value={{ openServiceDialog, setOpenServiceDialog }}
    >
      {children}
    </serviceDialogContext.Provider>
  );
}

export const useServiceDialog = () => {
  const context = useContext(serviceDialogContext);

  const { openServiceDialog, setOpenServiceDialog } = context;

  return { openServiceDialog, setOpenServiceDialog };
};
