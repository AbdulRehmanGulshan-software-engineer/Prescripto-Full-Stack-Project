// We can access the common logiv from this file

import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

// context provider function
const AppContextProvider = (props) => {
  const value = {
    doctors,
  };

  return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  ) 
}

export default AppContextProvider

// next we will add context support in our project(in main.jsx)