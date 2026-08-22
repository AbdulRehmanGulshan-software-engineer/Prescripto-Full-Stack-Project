import React, { useContext } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const DoctorSidebar = () => {
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="w-64 flex-shrink-0 sticky top-[73px] h-[calc(100vh-73px)]">
      {dToken && (
        <ul className="text-[#515151] mt-5">
          {/* Dashboard */}
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>

          {/* My Appointments */}
          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p>My Appointments</p>
          </NavLink>

          {/* Set Timings */}
          <NavLink
            to="/doctor-timings"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p>Set Timings</p>
          </NavLink>

          {/* My Profile */}
          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.people_icon} alt="" />
            <p>My Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default DoctorSidebar;