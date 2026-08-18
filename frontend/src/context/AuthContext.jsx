import { createContext, useEffect, useState } from "react";

import { getUserAppointments } from "../services/appointmentService";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../services/authService";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  // ==========================================================
  // Authentication State
  // ==========================================================

  const [user, setUser] = useState(null);

  const [token, setToken] = useState("");

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================================================
  // Get Current User
  // ==========================================================

  const loadUser = async () => {
    try {
      const data = await getCurrentUser();

      if (data.success) {
        setUser(data.userData);
        return data;
      }

      // Token is invalid
      setUser(null);
      setToken("");
      localStorage.removeItem("token");

      return data;
    } catch (error) {
      console.error("Get Current User Error:", error);

      setUser(null);
      setToken("");
      localStorage.removeItem("token");

      throw error;
    }
  };

  // ==========================================================
  // Restore Session
  // ==========================================================

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedToken = localStorage.getItem("token");

        if (!savedToken) {
          return;
        }

        // Restore token
        setToken(savedToken);

        // Get user data from backend
        await loadUser();
      } catch (error) {
        console.error("Session Restore Error:", error);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // ==========================================================
  // Load Appointments
  // ==========================================================

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const data = await getUserAppointments();

      setAppointments(data);
    } catch (error) {
      console.error("Appointments Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // Login
  // ==========================================================

  const login = async (formData) => {
    try {
      setLoading(true);

      const data = await loginUser(formData);

      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      // Save token
      setToken(data.token);

      // Persist token
      localStorage.setItem("token", data.token);

      // Get complete user profile from backend
      const profileData = await getCurrentUser();

      if (profileData.success) {
        setUser(profileData.userData);
      }

      return data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // Register
  // ==========================================================

  const register = async (formData) => {
    try {
      setLoading(true);

      const data = await registerUser(formData);

      if (!data.success) {
        throw new Error(data.message || "Registration failed");
      }

      // Save token
      setToken(data.token);

      // Persist token
      localStorage.setItem("token", data.token);

      // Get complete user profile from backend
      const profileData = await getCurrentUser();

      if (profileData.success) {
        setUser(profileData.userData);
      }

      return data;
    } catch (error) {
      console.error("Register Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // Logout
  // ==========================================================

  const logout = () => {
    setToken("");

    setUser(null);

    setAppointments([]);

    localStorage.removeItem("token");
  };

  // ==========================================================
  // Context Value
  // ==========================================================

  const value = {
    user,
    token,
    appointments,
    loading,

    setUser,
    setToken,
    setAppointments,

    login,
    register,
    logout,
    loadAppointments,
    loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;