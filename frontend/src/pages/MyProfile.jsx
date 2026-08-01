import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

/*
=====================================================

CURRENT FLOW

AppContext
   │
   └── user (Dummy Data)

This page only displays user information.

=====================================================

LATER WHEN BACKEND IS READY

1. AppContext will call GET API.

   axios.get("/api/user/profile")

2. Response will automatically update user state.

3. This page DOES NOT need any changes because
   it already gets user from AppContext.

=====================================================
*/

const MyProfile = () => {
  const { user } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">

      {/* Profile Image */}
      <img
        src={user.image}
        alt={user.name}
        className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover"
      />

      {/* User Name */}
      <h2 className="mt-6 text-2xl font-bold text-gray-800">
        {user.name}
      </h2>

      <hr className="my-6 border-gray-300" />

      {/* Contact Information */}

      <h3 className="text-sm uppercase tracking-wide font-semibold text-gray-500">
        Contact Information
      </h3>

      <div className="mt-5 space-y-5 text-gray-700">

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
          <p className="font-semibold min-w-[130px]">
            Email
          </p>

          <p className="break-all">
            {user.email}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
          <p className="font-semibold min-w-[130px]">
            Phone
          </p>

          <p>
            {user.phone}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-8">
          <p className="font-semibold min-w-[130px]">
            Address
          </p>

          <p>
            {user.address}
          </p>
        </div>

      </div>

      {/* Basic Information */}

      <h3 className="mt-10 text-sm uppercase tracking-wide font-semibold text-gray-500">
        Basic Information
      </h3>

      <div className="mt-5 space-y-5 text-gray-700">

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
          <p className="font-semibold min-w-[130px]">
            Gender
          </p>

          <p>
            {user.gender}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
          <p className="font-semibold min-w-[130px]">
            Date of Birth
          </p>

          <p>
            {user.dob}
          </p>
        </div>

      </div>

      {/* Edit Button */}

      <div className="mt-10">

        <button
          onClick={() => navigate("/edit-profile")}
          className="px-8 py-2 rounded-full border border-gray-400 hover:bg-gray-100 transition cursor-pointer"
        >
          Edit Profile
        </button>

      </div>

    </div>
  );
};

export default MyProfile;