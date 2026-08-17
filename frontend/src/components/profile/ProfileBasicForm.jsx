import React from "react";

const ProfileBasicForm = ({ user, setUser }) => {
  return (
    <>
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

      <div className="mt-5 space-y-5">
        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:gap-8
          "
        >
          <p className="font-semibold min-w-[130px]">Gender</p>

          <select
            value={user.gender}
            onChange={(e) =>
              setUser({
                ...user,
                gender: e.target.value,
              })
            }
            className="
              w-full
              sm:w-60
              border
              rounded-lg
              px-4
              py-2
            "
          >
            <option value="Not Selected">Not Selected</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:gap-8
          "
        >
          <p className="font-semibold min-w-[130px]">Date of Birth</p>

          <input
            type="date"
            value={user.dob}
            onChange={(e) =>
              setUser({
                ...user,
                dob: e.target.value,
              })
            }
            className="
              w-full
              sm:w-60
              border
              rounded-lg
              px-4
              py-2
            "
          />
        </div>
      </div>
    </>
  );
};

export default ProfileBasicForm;
