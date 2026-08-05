import React from "react";

const ProfileInfo = ({ user }) => {
  return (
    <>
      {/* Contact Information */}

      <h3
        className="
text-sm 
uppercase 
tracking-wide 
font-semibold 
text-gray-500
"
      >
        Contact Information
      </h3>

      <div className="mt-5 space-y-5 text-gray-700">
        <InfoRow label="Email" value={user.email} />

        <InfoRow label="Phone" value={user.phone} />

        <InfoRow label="Address" value={user.address} />
      </div>

      {/* Basic Information */}

      <h3
        className="
mt-10 
text-sm 
uppercase 
tracking-wide 
font-semibold 
text-gray-500
"
      >
        Basic Information
      </h3>

      <div className="mt-5 space-y-5 text-gray-700">
        <InfoRow label="Gender" value={user.gender} />

        <InfoRow label="Date of Birth" value={user.dob} />
      </div>
    </>
  );
};

const InfoRow = ({ label, value }) => {
  return (
    <div
      className="
flex 
flex-col 
sm:flex-row 
sm:items-center 
sm:gap-8
"
    >
      <p
        className="
font-semibold 
min-w-[130px]
"
      >
        {label}
      </p>

      <p className="break-all">{value}</p>
    </div>
  );
};

export default ProfileInfo;
