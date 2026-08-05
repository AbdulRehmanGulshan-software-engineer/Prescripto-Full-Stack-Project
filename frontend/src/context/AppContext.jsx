import { createContext, useState } from "react";

import {
    doctors as dummyDoctors,
    specialityData
} from "../assets/assets";

export const AppContext=createContext();

const AppContextProvider=({children})=>{

    // Global App States
    const [doctors,setDoctors]=useState(dummyDoctors);
    const currencySymbol="$";

    // Future
    // Load Doctors API
    const loadDoctors=async()=>{
        try{
            // Future

            // const data=await getDoctors();
            // setDoctors(data);
        }
        catch(error){
            console.log(error);

            // future
            // throw error;
        }
    }

    const value={
        currencySymbol,
        doctors,
        setDoctors,
        specialityData,
        loadDoctors
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;