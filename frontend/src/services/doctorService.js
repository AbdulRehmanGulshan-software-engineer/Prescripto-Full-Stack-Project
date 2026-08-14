import api from "../lib/axios";

// GET ALL DOCTORS - PAGINATED
export const getDoctors = async ({
  page = 1,
  limit = 10,
  available,
  speciality,
} = {}) => {
  try {
    console.log("I'm Backend, Calling List API")
    const response = await api.get("/api/doctor/list", {
      params: {
        page,
        limit,
        available,
        speciality,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};


// GET SINGLE DOCTOR
export const getDoctorById = async (doctorId) => {
  try {
    const response = await api.get(`/api/doctor/${doctorId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};