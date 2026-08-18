import React, { useState } from "react";
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

  // Local draft state
  const [draftUser, setDraftUser] = useState(() => ({
    ...user,
    address: user?.address ? { ...user.address } : {},
  }));

  // Safety Check
  if (!user) {
    return (
      <div className="py-10 text-center">Please login to edit profile.</div>
    );
  }

  // Save Profile
  const handleSave = async () => {
    try {
      const response = await updateProfile(draftUser);

      if (response.success) {
        // Get fresh user data from backend
        const userResponse = await getCurrentUser();

        if (userResponse.success) {
          // Update global user only after successful save
          setUser(userResponse.userData);

          // Update local draft as well
          setDraftUser(userResponse.userData);
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

  // Cancel changes
  const handleCancel = () => {
    // Discard local changes
    setDraftUser({
      ...user,
      address: user?.address ? { ...user.address } : {},
    });

    // Go back without modifying global user
    navigate("/my-profile");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* ================= Image ================= */}

      <ProfileImageInput user={draftUser} setUser={setDraftUser} />

      {/* ================= Name ================= */}

      <div className="mt-6">
        <input
          type="text"
          value={draftUser.name || ""}
          onChange={(e) =>
            setDraftUser({
              ...draftUser,
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

      <ProfileContactForm user={draftUser} setUser={setDraftUser} />

      {/* ================= Basic Info ================= */}

      <ProfileBasicForm user={draftUser} setUser={setDraftUser} />

      {/* ================= Actions ================= */}

      <ProfileActions onCancel={handleCancel} onSave={handleSave} />
    </div>
  );
};

export default EditProfile;