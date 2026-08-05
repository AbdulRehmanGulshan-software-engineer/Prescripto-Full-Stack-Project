import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";

const MyProfile = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  // ==========================
  // Safety Check
  // ==========================

  if (!user) {
    return (
      <div className="py-10 text-center">Please login to view profile.</div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* ================= Profile Header ================= */}

      <ProfileHeader user={user} />

      {/* ================= Profile Information ================= */}

      <ProfileInfo user={user} />

      {/* ================= Edit Profile ================= */}

      <div className="mt-10">
        <button
          onClick={() => navigate("/edit-profile")}
          className="
            px-8
            py-2
            rounded-full
            border
            border-gray-400
            hover:bg-gray-100
            transition
            cursor-pointer
          "
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;