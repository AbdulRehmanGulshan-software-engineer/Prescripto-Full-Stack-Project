import { createContext, useEffect, useState } from "react";

import { userData } from "../assets/assets";

import { getUserAppointments } from "../services/appointmentService";

// Future
// import {
//   loginUser,
//   registerUser,
//   getProfile,
// } from "../services/authService";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // ==========================================================
  // Authentication State
  // ==========================================================

  const [user, setUser] = useState(userData);

  const [token, setToken] = useState("");

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(false);

  // ==========================================================
  // Load User Appointments
  // ==========================================================

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const data = await getUserAppointments();

      setAppointments(data);
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // Restore Session
  // ==========================================================

  useEffect(() => {
    /*
    ==========================================================

    Future

    const savedToken = localStorage.getItem("token");

    if (!savedToken) return;

    setToken(savedToken);

    fetchProfile(savedToken);

    ==========================================================
    */

    loadAppointments();
  }, []);

  // ==========================================================
  // Login
  // ==========================================================

  const login = async (formData) => {
    try {
      setLoading(true);

      /*
      ==========================================================

      Future

      const data = await loginUser(formData);

      setUser(data.user);

      setToken(data.token);

      localStorage.setItem(
        "token",
        data.token
      );

      await loadAppointments();

      ==========================================================
      */

      console.log("Login:", formData);
    } catch (error) {
      console.log(error);

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

      /*
      ==========================================================

      Future

      const data = await registerUser(formData);

      setUser(data.user);

      setToken(data.token);

      localStorage.setItem(
        "token",
        data.token
      );

      ==========================================================
      */

      console.log("Register:", formData);
    } catch (error) {
      console.log(error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // Logout
  // ==========================================================

  const logout = () => {
    setUser(null);

    setToken("");

    setAppointments([]);

    /*
    ==========================================================

    Future

    localStorage.removeItem("token");

    ==========================================================
    */
  };

  // ==========================================================
  // Context Value
  // ==========================================================

  const value = {
    // State
    user,
    token,
    appointments,
    loading,

    // Setters
    setUser,
    setToken,
    setAppointments,

    // Actions
    login,
    register,
    logout,
    loadAppointments,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
