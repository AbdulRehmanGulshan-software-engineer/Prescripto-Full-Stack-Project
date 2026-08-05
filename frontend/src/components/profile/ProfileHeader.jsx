import React from "react";

const ProfileHeader = ({ user }) => {
  return (
    <>
      {/* Profile Image */}

      <img
        src={user.image}
        alt={user.name}
        className="
        w-32 
        h-32 
        sm:w-40 
        sm:h-40 
        rounded-xl 
        object-cover
        "
      />

      {/* User Name */}

      <h2
        className="
      mt-6 
      text-2xl 
      font-bold 
      text-gray-800
      "
      >
        {user.name}
      </h2>

      <hr className="my-6 border-gray-300" />
    </>
  );
};

export default ProfileHeader;
