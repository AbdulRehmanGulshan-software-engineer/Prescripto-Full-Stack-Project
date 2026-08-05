import api from "../lib/axios";
import { dummyAppointments } from "../assets/assets";

/*
==========================================================
Appointment Service

Only communicates with API.

UI Components should NEVER call axios directly.

Current:
Dummy Data

Future:
Backend API

==========================================================
*/

/* ==========================================================
   Get Logged In User Appointments
========================================================== */

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

/* ==========================================================
   Book Appointment
========================================================== */

export const bookAppointment = async (appointmentData) => {
  try {
    /*
    ===========================================
    Future API

    const { data } = await api.post(
      "/appointments",
      appointmentData
    );

    return data;
    ===========================================
    */

    console.log("Book Appointment:", appointmentData);

    return {
      success: true,
      message: "Appointment booked successfully.",
    };
  } catch (error) {
    throw error;
  }
};

/* ==========================================================
   Cancel Appointment
========================================================== */

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