import { createContext, useEffect, useState } from "react";

import { userData } from "../assets/assets";

import { getUserAppointments } from "../services/appointmentService";
import { loginUser, registerUser } from "../services/authService";

// Future:
// import { getCurrentUser } from "../services/authService";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // ==========================================================
  // Authentication State
  // ==========================================================

  /*
  CURRENT:

  Temporary userData is being used.

  FUTURE:

  Once GET /api/user/profile is implemented:

      const [user, setUser] = useState(null);

  Then getCurrentUser() will populate this state.
  */

  const [user, setUser] = useState(userData);

  /*
  JWT token of authenticated user.
  */

  const [token, setToken] = useState("");

  /*
  User's appointments.
  */

  const [appointments, setAppointments] = useState([]);

  /*
  Global loading state.
  */

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
      console.log("Appointments Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // Restore Session
  // ==========================================================

  useEffect(() => {
    const restoreSession = async () => {
      try {
        setLoading(true);

        // ----------------------------------------------------
        // Get saved JWT from localStorage
        // ----------------------------------------------------

        const savedToken = localStorage.getItem("token");

        if (!savedToken) {
          return;
        }

        setToken(savedToken);

        // ====================================================
        // FUTURE:
        // Get authenticated user profile
        // ====================================================

        /*
        const data = await getCurrentUser();

        if (data.success) {
          setUser(data.user);
        }
        */

        // ====================================================
        // FUTURE:
        // Load appointments
        // ====================================================

        /*
        await loadAppointments();
        */
      } catch (error) {
        console.log("Session Restore Error:", error);

        // ----------------------------------------------------
        // FUTURE:
        //
        // If token is invalid or expired:
        //
        // localStorage.removeItem("token");
        // setToken("");
        // setUser(null);
        // ----------------------------------------------------
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // ==========================================================
  // Login
  // ==========================================================

  const login = async (formData) => {
    try {
      setLoading(true);

      const data = await loginUser(formData);

      if (!data.success) {
        throw new Error(data.message);
      }

      setToken(data.token);

      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      console.log("Login Error:", error);
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
        throw new Error(data.message);
      }

      setToken(data.token);

      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      console.log("Register Error:", error);
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

    localStorage.removeItem("token");

    // ========================================================
    // FUTURE:
    //
    // If server-side session invalidation is implemented:
    //
    // await logoutUser();
    // ========================================================
  };

  // ==========================================================
  // Context Value
  // ==========================================================

  const value = {
    // --------------------------------------------------------
    // State
    // --------------------------------------------------------

    user,
    token,
    appointments,
    loading,

    // --------------------------------------------------------
    // Setters
    // --------------------------------------------------------

    setUser,
    setToken,
    setAppointments,

    // --------------------------------------------------------
    // Actions
    // --------------------------------------------------------

    login,
    register,
    logout,
    loadAppointments,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;