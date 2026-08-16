import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
// import Policy from "./pages/Policy";
import EditProfile from "./pages/EditProfile";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ScrollToTop />

      <Navbar />

      {/* Navbar height */}
      <div className="h-25"></div>

      <Routes>
        {/* ================================================== */}
        {/* PUBLIC ROUTES                                     */}
        {/* ================================================== */}

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
        </Route>

        {/* ================================================== */}
        {/* GENERAL PUBLIC ROUTES                             */}
        {/* ================================================== */}

        <Route path="/" element={<Home />} />

        <Route path="/doctors" element={<Doctors />} />

        <Route path="/doctors/:speciality" element={<Doctors />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        {/* <Route path="/policy" element={<Policy />} /> */}

        {/* ================================================== */}
        {/* PROTECTED ROUTES                                  */}
        {/* ================================================== */}

        <Route element={<ProtectedRoute />}>
          <Route path="/my-profile" element={<MyProfile />} />

          <Route path="/my-appointments" element={<MyAppointments />} />

          <Route path="/appointments/:docId" element={<Appointment />} />

          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
};

export default App;