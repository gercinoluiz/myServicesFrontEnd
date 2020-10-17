import React, { useState, useEffect, useContext, createContext } from "react";
import { getAllLocations } from "../../apiCalls/apiCalls";

const LocationsContext = createContext();

const LocationsProvider = ({ children }) => {
  const [allLocations, setAllLocations] = useState();

  useEffect(() => {
    getAllLocations().then((response) => {
      setAllLocations(response);
    });
  }, []);

  console.log("context", allLocations);

  return (
    <LocationsContext.Provider value={{ allLocations, setAllLocations }}>
      {children}
    </LocationsContext.Provider>
  );
};

export const useAllLocations = () => {
  const context = useContext(LocationsContext);

  const { allLocations, setAllLocations } = context;

  return { allLocations, setAllLocations };
};

export default LocationsProvider;
