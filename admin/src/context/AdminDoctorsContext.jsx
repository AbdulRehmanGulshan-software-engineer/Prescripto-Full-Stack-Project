import { createContext, useCallback, useState } from "react";
import { toast } from "react-toastify";

import {
  changeDoctorAvailability as changeDoctorAvailabilityApi,
  getDoctors as getDoctorsApi,
} from "../services/doctorService";

export const AdminDoctorsContext = createContext(null);

export const AdminDoctorsProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalDoctors: 0,
    hasMore: false,
  });

  // Get doctors
  const getDoctors = useCallback(async (page = 1, limit = 10, signal) => {
    try {
      setLoading(true);
      setError("");

      const data = await getDoctorsApi({
        page,
        limit,
        signal,
      });

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch doctors");
      }

      setDoctors(data.doctors || []);

      setPagination({
        currentPage: data.currentPage || page,
        totalPages: data.totalPages || 1,
        totalDoctors: data.totalDoctors || 0,
        hasMore: Boolean(data.hasMore),
      });
    } catch (err) {
      // Ignore cancelled requests
      if (err.code === "ERR_CANCELED") {
        return;
      }

      console.error("Get doctors error:", err);

      setError(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Change doctor availability
  const changeAvailability = useCallback(async (docId) => {
    try {
      const data = await changeDoctorAvailabilityApi(docId);

      if (!data.success) {
        throw new Error(data.message || "Failed to change availability");
      }

      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor._id === docId
            ? {
                ...doctor,
                available: data.available,
              }
            : doctor,
        ),
      );

      toast.success(
        "Availability Changed"
      )

      return data;
    } catch (err) {
      console.error("Change availability error:", err);

      throw new Error(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    }
  }, []);

  return (
    <AdminDoctorsContext.Provider
      value={{
        doctors,
        loading,
        error,
        pagination,
        getDoctors,
        changeAvailability,
      }}
    >
      {children}
    </AdminDoctorsContext.Provider>
  );
};