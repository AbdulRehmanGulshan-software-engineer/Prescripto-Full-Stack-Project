import api from "../lib/axios";

// REGISTER
export const registerUser = async (userData) => {
  try {
    // ===========================================
    // FUTURE:
    // Uncomment when backend is ready
    // ===========================================

    // const response = await api.post("/auth/register", userData);
    // return response.data;

    console.log("Register User:", userData);

    return {
      success: true,
      message: "Dummy Register Success",
      user: userData,
      token: "",
    };
  } catch (error) {
    throw error;
  }
};

// LOGIN
export const loginUser = async (credentials) => {
  try {
    // const response = await api.post("/auth/login", credentials);
    // return response.data;

    console.log("Login:", credentials);

    return {
      success: true,
      user: credentials,
      token: "",
    };
  } catch (error) {
    throw error;
  }
};

// GET CURRENT USER
export const getCurrentUser = async () => {
  try {
    // const response = await api.get("/user/profile");
    // return response.data;

    return null;
  } catch (error) {
    throw error;
  }
};