import { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";

const AdminDoctorsContext = createContext(null);

const API_URL = import.meta.env.VITE_BACKEND_URL;

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

  const getDoctors = useCallback(
    async (page = 1, limit = 10, signal) => {
      try {
        setLoading(true);
        setError("");

        // Get admin token from localStorage
        const aToken = localStorage.getItem("aToken");

        if (!aToken) {
          throw new Error("Admin token not found");
        }

        const { data } = await axios.get(
          `${API_URL}/api/admin/all-doctors`,
          {
            params: {
              page,
              limit,
            },
            headers: {
              aToken,
            },
            signal,
          },
        );

        if (!data.success) {
          throw new Error(
            data.message || "Failed to fetch doctors",
          );
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
        if (err.code === "ERR_CANCELED") return;

        console.error("Get doctors error:", err);

        setError(
          err.response?.data?.message ||
            err.message ||
            "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <AdminDoctorsContext.Provider
      value={{
        doctors,
        loading,
        error,
        pagination,
        getDoctors,
      }}
    >
      {children}
    </AdminDoctorsContext.Provider>
  );
};

export const useAdminDoctors = () => {
  const context = useContext(AdminDoctorsContext);

  if (!context) {
    throw new Error(
      "useAdminDoctors must be used inside AdminDoctorsProvider",
    );
  }

  return context;
};