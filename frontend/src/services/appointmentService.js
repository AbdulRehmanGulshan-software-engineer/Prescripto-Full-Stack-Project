import api from "../lib/axios";
import { dummyAppointments } from "../assets/assets";

// Current:
// - Book Appointment → Real Backend API
// - Get Appointments → Dummy Data
// - Cancel Appointment → Dummy Response

// Future:
// - Get Appointments → Backend API
// - Cancel Appointment → Backend API

//  Get Logged In User Appointments
export const getUserAppointments = async () => {
  try {
    /*
    ===========================================
    Future API

    const { data } = await api.get(
      "/appointments/user"
    );

    return data;
    ===========================================
    */

    return dummyAppointments;
  } catch (error) {
    throw error;
  }
};

//  Book Appointment
export const bookAppointment = async (appointmentData) => {
  try {
    const { data } = await api.post(
      "/api/user/book-appointment",
      appointmentData
    );

    return data;
  } catch (error) {
    throw error;
  }
};

//  Cancel Appointment
export const cancelAppointment = async (appointmentId) => {
  try {
    /*
    ===========================================
    Future API

    const { data } = await api.delete(
      `/appointments/${appointmentId}`
    );

    return data;
    ===========================================
    */

    console.log("Cancel Appointment:", appointmentId);

    return {
      success: true,
      message: "Appointment cancelled successfully.",
    };
  } catch (error) {
    throw error;
  }
};