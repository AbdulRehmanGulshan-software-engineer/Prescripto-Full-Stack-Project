import api from "../lib/axios";

// UPDATE PROFILE
export const updateProfile = async (profileData) => {
  try {
    const formData = new FormData();

    formData.append("name", profileData.name);
    formData.append("phone", profileData.phone);
    formData.append("address", JSON.stringify(profileData.address));
    formData.append("dob", profileData.dob);
    formData.append("gender", profileData.gender);

    // Actual image file
    if (profileData.imageFile) {
      formData.append("image", profileData.imageFile);
    }

    const response = await api.post(
      "/api/user/update-profile",
      formData
    );

    return response.data;
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