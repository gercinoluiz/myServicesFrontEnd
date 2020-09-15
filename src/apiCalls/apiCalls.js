import { API } from "../backend";

export const getLocationsByService = () => {
  return fetch(
    // YOU AWAYS GOTTA GET THE FUCKING FETCH BACK
    `${API}/locations/getlocationsbyservice/-23.6958247, -46.7868246/5f583ac164851548088aed9e`,
    { method: "GET" }
  )
    .then(
      (response) => response.json() //ALWAYS GIVE IT BACK AS JSON
    )
    .catch((error) => {
      throw new Error(error);
    });
};
