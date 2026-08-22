import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const AdminSidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="w-64 flex-shrink-0 sticky top-[73px] h-[calc(100vh-73px)]">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          {/* Dashboard */}
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>

          {/* Appointments */}
          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>

          {/* Add Doctor */}
          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>

          {/* Doctors List */}
          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer ${
                isActive ? "bg-[#f2f3ff] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.people_icon} alt="" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default AdminSidebar;