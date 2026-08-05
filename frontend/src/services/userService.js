import api from "../lib/axios";

// UPDATE PROFILE
export const updateProfile = async (profileData) => {
  try {
    // const response = await api.put(
    //   "/user/profile",
    //   profileData
    // );

    // return response.data;

    console.log(profileData);

    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};

// CHANGE PASSWORD
export const changePassword = async (passwordData) => {
  try {
    // const response = await api.put(
    //   "/user/change-password",
    //   passwordData
    // );

    // return response.data;

    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
};