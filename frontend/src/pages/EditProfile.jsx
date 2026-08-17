import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";
import { updateProfile } from "../services/userService";

import ProfileImageInput from "../components/profile/ProfileImageInput";
import ProfileContactForm from "../components/profile/ProfileContactForm";
import ProfileBasicForm from "../components/profile/ProfileBasicForm";
import ProfileActions from "../components/profile/ProfileActions";

import { toast } from "react-toastify";
import { getCurrentUser } from "../services/authService";

const EditProfile = () => {
  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  // Safety Check
  if (!user) {
    return (
      <div className="py-10 text-center">Please login to edit profile.</div>
    );
  }

  // Save Profile
  const handleSave = async () => {
    try {
      const response = await updateProfile(user);

      if (response.success) {
        // Get fresh user data from backend
        const userResponse = await getCurrentUser();

        if (userResponse.success) {
          setUser(userResponse.userData);
        }

        toast.success("Profile updated successfully!");

        navigate("/my-profile");
      } else {
        toast.error(response.message || "Profile update failed");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* ================= Image ================= */}

      <ProfileImageInput user={user} setUser={setUser} />

      {/* ================= Name ================= */}

      <div className="mt-6">
        <input
          type="text"
          value={user.name}
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
          className="
            w-full
            sm:w-96
            border
            rounded-lg
            px-4
            py-2
            outline-none
          "
        />
      </div>

      <hr className="my-6 border-gray-300" />

      {/* ================= Contact ================= */}

      <ProfileContactForm user={user} setUser={setUser} />

      {/* ================= Basic Info ================= */}

      <ProfileBasicForm user={user} setUser={setUser} />

      {/* ================= Actions ================= */}

      <ProfileActions
        onCancel={() => navigate("/my-profile")}
        onSave={handleSave}
      />
    </div>
  );
};

export default EditProfile;
