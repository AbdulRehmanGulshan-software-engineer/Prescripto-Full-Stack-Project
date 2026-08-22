import React, { useContext } from "react";
import Login from "./pages/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AdminContext } from "./context/AdminContext";
import { DoctorContext } from "./context/DoctorContext";

import Navbar from "./components/Navbar";
import AdminSidebar from "./components/AdminSidebar";

import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";

import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorSidebar from "./components/DoctorSidebar";
import MyAppointments from "./pages/Doctor/Appointments";
import Timings from "./pages/Doctor/Timings";
import Profile from "./pages/Doctor/Profile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // Admin is logged in
  if (aToken) {
    return (
      <div className="bg-[#f8f9fd] min-h-screen">
        <ToastContainer />

        <Navbar />

        <div className="flex items-start pt-[73px]">
          <AdminSidebar />

          <Routes>
            <Route path="/admin-dashboard" element={<Dashboard />} />

            <Route path="/all-appointments" element={<AllAppointments />} />

            <Route path="/add-doctor" element={<AddDoctor />} />

            <Route path="/doctor-list" element={<DoctorsList />} />
          </Routes>
        </div>
      </div>
    );
  }

  // Doctor is logged in
  if (dToken) {
    return (
      <div className="bg-[#f8f9fd] min-h-screen">
        <ToastContainer />

        <Navbar />

        <div className="flex items-start pt-[73px]">
          <DoctorSidebar />

          <Routes>
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-appointments" element={<MyAppointments />} />
            <Route path="/doctor-timings" element={<Timings />} />
            <Route path="/doctor-profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    );
  }

  // Nobody is logged in
  return (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
