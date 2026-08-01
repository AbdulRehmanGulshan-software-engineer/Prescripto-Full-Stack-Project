import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

/*
========================================================

CURRENT

User data is coming from AppContext.

Changing any input updates the global user state.

========================================================

LATER WHEN BACKEND IS READY

Inside handleSave()

try {

   await axios.put("/api/user/profile", user);

   navigate("/my-profile");

}
catch(error){

   console.log(error);

}

========================================================
*/

const EditProfile = () => {
  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSave = () => {
    // TODO:
    // Later call PUT API here.

    navigate("/my-profile");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">

      {/* Profile Image */}

      <img
        src={user.image}
        alt={user.name}
        className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl"
      />

      {/* Name */}

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
          className="w-full sm:w-96 border rounded-lg px-4 py-2 outline-none"
        />

      </div>

      <hr className="my-6 border-gray-300" />

      {/* Contact Information */}

      <h3 className="text-sm uppercase tracking-wide font-semibold text-gray-500">
        Contact Information
      </h3>

      <div className="mt-5 space-y-5">

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">

          <p className="font-semibold min-w-[130px]">
            Email
          </p>

          {/* Email is readonly */}

          <input
            value={user.email}
            readOnly
            className="w-full sm:w-96 border rounded-lg px-4 py-2 bg-gray-100"
          />

        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">

          <p className="font-semibold min-w-[130px]">
            Phone
          </p>

          <input
            value={user.phone}
            onChange={(e) =>
              setUser({
                ...user,
                phone: e.target.value,
              })
            }
            className="w-full sm:w-96 border rounded-lg px-4 py-2 outline-none"
          />

        </div>

        <div className="flex flex-col sm:flex-row sm:gap-8">

          <p className="font-semibold min-w-[130px]">
            Address
          </p>

          <textarea
            rows={3}
            value={user.address}
            onChange={(e) =>
              setUser({
                ...user,
                address: e.target.value,
              })
            }
            className="w-full sm:w-96 border rounded-lg px-4 py-2 outline-none resize-none"
          />

        </div>

      </div>

      {/* Basic Information */}

      <h3 className="mt-10 text-sm uppercase tracking-wide font-semibold text-gray-500">
        Basic Information
      </h3>

      <div className="mt-5 space-y-5">

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">

          <p className="font-semibold min-w-[130px]">
            Gender
          </p>

          <select
            value={user.gender}
            onChange={(e) =>
              setUser({
                ...user,
                gender: e.target.value,
              })
            }
            className="w-full sm:w-60 border rounded-lg px-4 py-2"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">

          <p className="font-semibold min-w-[130px]">
            Date of Birth
          </p>

          <input
            type="date"
            value={user.dob}
            onChange={(e) =>
              setUser({
                ...user,
                dob: e.target.value,
              })
            }
            className="w-full sm:w-60 border rounded-lg px-4 py-2"
          />

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-10 flex flex-col sm:flex-row gap-4">

        <button
          onClick={() => navigate("/my-profile")}
          className="px-8 py-2 rounded-full border border-gray-400 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="px-8 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition"
        >
          Save Information
        </button>

      </div>

    </div>
  );
};

export default EditProfile;