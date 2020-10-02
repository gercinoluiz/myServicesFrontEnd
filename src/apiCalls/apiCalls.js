import { API } from "../backend";
import axios from "axios";

//**! OLD
export const getAllNearLocations = (latlng) => {
  return fetch(
    // YOU AWAYS GOTTA GET THE FUCKING FETCH BACK
    `${API}/locations/getlocationsbyservice/-23.6958247, -46.7868246/5f583ac164851548088aed9e`, //TODO: Fix the latitud an longtude
    { method: "GET" }
  )
    .then(
      (response) => response.json() //ALWAYS GIVE IT BACK AS JSON
    )
    .catch((error) => {
      throw new Error(error);
    });
};
//**!

export const getAllServices = () => {
  console.log({ API });
  return fetch(`${API}/services/getAllServices`, { method: "GET" })
    .then((response) => {
      console.log({ response });
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getLocationsByService = (serviceId, latlng) => {

  
  return fetch(
    // YOU AWAYS GOTTA GET THE FUCKING FETCH BACK
    `${API}/locations/getlocationsbyservice/${latlng}/${serviceId}`,
    { method: "GET" }
  )
    .then(
      (response) => response.json() //ALWAYS GIVE IT BACK AS JSON
    )
    .catch((error) => {
      throw new Error(error);
    });
};

export const getAllLocations = () => {
  return fetch(`${API}/locations/getlocations`, { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const createNewLocation = (location) => {
  console.log("API", { location });

  return fetch(`${API}/locations/newlocation`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(location), // the que fazer essa porra // voce soh consegue transmitir na web em formato string
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateService = (serviceId, newService) => {
  return fetch(`${API}/services/updateService/${serviceId}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newService }),
  }).then((response) => response.json());
};

export const createService = (name) => {
  return fetch(`${API}/services/newservice`, {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name }),
  }).then((response) => response.json());
};

export const deleteService = (serviceId) => {
  return fetch(`${API}/services/deleteService/${serviceId}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

export const deleteLocation = (locationId) => {
  console.log({ locationId });
  return fetch(`${API}/locations/deleteLocation/${locationId}`, {
    method: "DELETE",
  }).then((response) => response.json());
};

export const updateLocal = async (localId, local) => {
  console.log(localId, local);
  try {
    const updatedLocation = await axios.patch(
      `${API}/locations/updateLocation/${localId}`,
      local
    );

    return updatedLocation;
  } catch (error) {
    return error;
  }
};
