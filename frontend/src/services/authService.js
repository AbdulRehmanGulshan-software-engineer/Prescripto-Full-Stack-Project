import api from "../lib/axios";

// ==========================================================
// REGISTER
// ==========================================================

export const registerUser = async (userData) => {
  try {
    const response = await api.post(
      "/api/user/register",
      userData
    );

    return response.data;

  } catch (error) {
    throw error;
  }
};


// ==========================================================
// LOGIN
// ==========================================================

export const loginUser = async (credentials) => {
  try {
    const response = await api.post(
      "/api/user/login",
      credentials
    );

    return response.data;

  } catch (error) {
    throw error;
  }
};


// ==========================================================
// GET CURRENT USER
// ==========================================================

export const getCurrentUser = async () => {
  try {

    // FUTURE:
    //
    // Backend:
    //
    // GET /api/user/profile
    //
    // Axios interceptor automatically adds:
    //
    // Authorization: Bearer <aToken>

    /*
    const response = await api.get(
      "/api/user/profile"
    );

    return response.data;
    */

    return null;

  } catch (error) {
    throw error;
  }
};