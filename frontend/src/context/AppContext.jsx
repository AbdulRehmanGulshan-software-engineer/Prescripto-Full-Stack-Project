import { createContext, useState } from "react";

import { specialityData } from "../assets/assets";

import { getDoctors, getDoctorById } from "../services/doctorService";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // CURRENT DOCTORS
  const [doctors, setDoctors] = useState([]);

  // SINGLE DOCTOR CACHE
  const [doctorCache, setDoctorCache] = useState({});

  // DOCTOR PAGE CACHE
  const [doctorPageCache, setDoctorPageCache] = useState({});

  // PAGINATION
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalDoctors: 0,
    totalPages: 0,
  });

  const currencySymbol = "$";

  // LOAD DOCTORS
  const loadDoctors = async ({
    page = 1,
    limit = 10,
    available,
    speciality,
  } = {}) => {
    try {
      // CREATE CACHE KEY
      const cacheKey = [
        `page=${page}`,
        `limit=${limit}`,
        `available=${available === undefined ? "all" : available}`,
        `speciality=${speciality || "all"}`,
      ].join("|");

      // CHECK PAGE CACHE
      const cachedData = doctorPageCache[cacheKey];

      if (cachedData) {
        // console.log("Doctors page found in cache:", cacheKey);

        setDoctors(cachedData.doctors);

        setPagination(cachedData.pagination);

        return cachedData;
      }

      // API REQUEST
      // console.log("Doctors page not in cache → API request");

      const data = await getDoctors({
        page,
        limit,
        available,
        speciality,
      });

      // SET CURRENT DOCTORS
      setDoctors(data.doctors);

      setPagination(data.pagination);

      // SAVE PAGE IN CACHE
      setDoctorPageCache((prevCache) => ({
        ...prevCache,

        [cacheKey]: {
          doctors: data.doctors,
          pagination: data.pagination,
        },
      }));

      // ALSO SAVE INDIVIDUAL DOCTORS
      setDoctorCache((prevCache) => {
        const updatedCache = {
          ...prevCache,
        };

        data.doctors.forEach((doctor) => {
          updatedCache[doctor._id] = doctor;
        });

        return updatedCache;
      });

      return data;
    } catch (error) {
      // console.log(error);

      throw error;
    }
  };

  // GET SINGLE DOCTOR
  const getDoctor = async (doctorId) => {
    // CHECK SINGLE DOCTOR CACHE
    if (doctorCache[doctorId]) {
      // console.log("Doctor found in cache");

      return doctorCache[doctorId];
    }

    // API REQUEST
    // console.log("Doctor not in cache → API request");

    try {
      const data = await getDoctorById(doctorId);

      const doctor = data.doctor;

      // SAVE SINGLE DOCTOR
      setDoctorCache((prevCache) => ({
        ...prevCache,

        [doctor._id]: doctor,
      }));

      return doctor;
    } catch (error) {
      // console.log(error);

      throw error;
    }
  };

  // CONTEXT VALUE
  const value = {
    currencySymbol,

    // Doctors
    doctors,
    setDoctors,

    // Pagination
    pagination,

    // Functions
    loadDoctors,
    getDoctor,

    // Other
    specialityData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
