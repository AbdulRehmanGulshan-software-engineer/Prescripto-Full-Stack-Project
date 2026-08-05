import React from "react";

import { assets } from "../../assets/assets";

const DoctorInfo = ({ doctor, currencySymbol }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div>
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full rounded-lg bg-primary sm:max-w-72"
        />
      </div>

      <div className="mx-2 mt-[-80px] flex-1 rounded-lg border border-gray-300 bg-white p-8 py-7 sm:mx-0 sm:mt-0">
        <p className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
          {doctor.name}

          <img
            src={assets.verified_icon}
            alt="Verified"
            className="w-5"
          />
        </p>

        <div className="mt-1 flex items-center gap-2 text-gray-600">
          <p>
            {doctor.degree} - {doctor.speciality}
          </p>

          <span className="rounded-full border px-2 py-0.5 text-xs">
            {doctor.experience}
          </span>
        </div>

        <div className="mt-4">
          <p className="flex items-center gap-1 font-medium">
            About

            <img
              src={assets.info_icon}
              alt=""
            />
          </p>

          <p className="mt-1 max-w-[700px] text-sm text-gray-600">
            {doctor.about}
          </p>
        </div>

        <p className="mt-5 font-medium text-gray-700">
          Appointment Fee :

          <span className="ml-1 text-gray-900">
            {currencySymbol}
            {doctor.fees}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DoctorInfo;