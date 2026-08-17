import { createContext, useEffect, useState } from "react";

import { userData } from "../assets/assets";

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

  const [user, setUser] = useState({});

  /*
    JWT token of authenticated user.

    Empty string means:
    user is not authenticated.
  */
  const [token, setToken] = useState("");

  /*
    User appointments.
  */
  const [appointments, setAppointments] = useState([]);

  /*
    IMPORTANT:

    Start with true because we need to check localStorage
    before deciding whether the user is authenticated.
  */
  const [loading, setLoading] = useState(true);

  // ==========================================================
  // Restore Session
  // ==========================================================

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedToken = localStorage.getItem("token");

        // No saved token
        if (!savedToken) {
          return;
        }

        // Restore token into React state
        setToken(savedToken);

        const data = await getCurrentUser();
        if (data.success) {
          setUser(data.userData);
        }
      } catch (error) {
        console.error("Session Restore Error:", error);

        /*
          If token becomes invalid/expired in future:

          localStorage.removeItem("token");
          setToken("");
          setUser(null);
        */
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

      /*
        Save token in React state
      */
      setToken(data.token);

      /*
        Persist token so authentication survives refresh
      */
      localStorage.setItem("token", data.token);

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

      /*
        If backend automatically logs the user in after
        registration and returns a JWT:
      */

      setToken(data.token);

      localStorage.setItem("token", data.token);

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
    /*
      Clear React authentication state
    */
    setToken("");

    /*
      Clear user state
    */
    setUser(null);

    /*
      Clear appointments
    */
    setAppointments([]);

    /*
      Remove persisted JWT
    */
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
