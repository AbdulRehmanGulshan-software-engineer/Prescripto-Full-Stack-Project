import api from "../lib/axios";

import { doctors as dummyDoctors } from "../assets/assets";

// GET ALL DOCTORS
export const getDoctors = async () => {
  try {
    // const response = await api.get("/doctors");
    // return response.data;

    return dummyDoctors;
  } catch (error) {
    throw error;
  }
};

// GET SINGLE DOCTOR
export const getDoctorById = async (doctorId) => {
  try {
    // const response = await api.get(`/doctors/${doctorId}`);
    // return response.data;

    return dummyDoctors.find((doctor) => doctor._id === doctorId);
  } catch (error) {
    throw error;
  }
};