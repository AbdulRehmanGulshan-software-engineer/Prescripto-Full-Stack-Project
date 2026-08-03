// Global Context
// This file stores data that can be accessed from anywhere in the app.

// React
import { createContext, useState, useEffect } from "react";

// Dummy Data
import { doctors, specialityData, userData } from "../assets/assets";

// import axios from "axios"; // Uncomment when backend is ready

export const AppContext = createContext();

// Context Provider
const AppContextProvider = ({ children }) => {

  // ------------------------------------
  // USER STATE
  // ------------------------------------
  // Currently using dummy data.
  // Later this state will be filled by GET API.
  const [user, setUser] = useState(userData);

  /*
  ==================================================

  LATER WHEN BACKEND IS READY

  useEffect(() => {

      const fetchUser = async () => {

          try {

              const { data } = await axios.get("/api/user/profile");

              setUser(data);

          }

          catch(error){

              console.log(error);

          }

      }

      fetchUser();

  }, []);

  ==================================================
  */

  const currencySymbol = '$'

  // Global values available throughout the application
  const value = {
    doctors,
    specialityData,
    currencySymbol,
    // User
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;