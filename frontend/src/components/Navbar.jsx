import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const navigate = useNavigate();

  // User authentication state/actions
  const { token, logout } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // ==========================================================
  // Logout
  // ==========================================================

  const handleLogout = () => {
    logout();

    // Optional: redirect user to login page
    navigate("/login");
  };

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 w-full bg-white z-50"
    >
      <div className="mx-4 sm:mx-[10%]">
        <div className="flex items-center justify-between py-4 border-b border-gray-300">
          {/* Logo */}
          <NavLink to="/">
            <img
              className="w-44 cursor-pointer"
              src={assets.logo}
              alt="Prescripto Logo"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-start gap-5 font-medium text-sm">
            <NavLink to="/">
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-1">
                  <li>HOME</li>

                  {isActive && (
                    <hr className="w-2/3 border-none h-0.5 bg-primary rounded-full" />
                  )}
                </div>
              )}
            </NavLink>

            <NavLink to="/doctors">
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-1">
                  <li>ALL DOCTORS</li>

                  {isActive && (
                    <hr className="w-2/3 border-none h-0.5 bg-primary rounded-full" />
                  )}
                </div>
              )}
            </NavLink>

            <NavLink to="/about">
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-1">
                  <li>ABOUT</li>

                  {isActive && (
                    <hr className="w-2/3 border-none h-0.5 bg-primary rounded-full" />
                  )}
                </div>
              )}
            </NavLink>

            <NavLink to="/contact">
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-1">
                  <li>CONTACT</li>

                  {isActive && (
                    <hr className="w-2/3 border-none h-0.5 bg-primary rounded-full" />
                  )}
                </div>
              )}
            </NavLink>
          </ul>

          {/* Right Side */}
          <div className="flex items-center">
            {/* ==================================================
                Desktop
            ================================================== */}

            <div className="hidden md:flex items-center gap-4">
              {token ? (
                <div className="relative group flex items-center gap-2 cursor-pointer">
                  <img
                    className="w-8 rounded-full"
                    src={assets.profile_pic}
                    alt="Profile"
                  />

                  <img
                    className="w-2.5"
                    src={assets.dropdown_icon}
                    alt="Dropdown"
                  />

                  <div className="absolute right-0 top-0 hidden pt-14 group-hover:block z-20">
                    <div className="min-w-48 bg-stone-100 rounded shadow-lg p-4 flex flex-col gap-3 text-gray-600">
                      <p
                        className="cursor-pointer hover:text-black"
                        onClick={() => navigate("/my-profile")}
                      >
                        My Profile
                      </p>

                      <p
                        className="cursor-pointer hover:text-black"
                        onClick={() => navigate("/my-appointments")}
                      >
                        My Appointments
                      </p>

                      <p
                        className="cursor-pointer hover:text-black"
                        onClick={handleLogout}
                      >
                        Logout
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-primary text-white rounded-full px-8 py-3 font-light"
                >
                  Create Account
                </button>
              )}
            </div>

            {/* ==================================================
                Mobile
            ================================================== */}

            <div className="md:hidden flex items-center gap-3">
              {token ? (
                <div className="relative">
                  <div className="flex items-center gap-1">
                    <img
                      src={assets.profile_pic}
                      className="w-8 rounded-full cursor-pointer"
                      alt="Profile"
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                    />

                    <img src={assets.dropdown_icon} alt="" className="w-2.5" />
                  </div>

                  {showProfileMenu && (
                    <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg p-4 min-w-48 flex flex-col gap-3">
                      <p
                        onClick={() => {
                          navigate("/my-profile");
                          setShowProfileMenu(false);
                        }}
                        className="cursor-pointer hover:text-black"
                      >
                        My Profile
                      </p>

                      <p
                        onClick={() => {
                          navigate("/my-appointments");
                          setShowProfileMenu(false);
                        }}
                        className="cursor-pointer hover:text-black"
                      >
                        My Appointments
                      </p>

                      <p
                        onClick={() => {
                          handleLogout();
                          setShowProfileMenu(false);
                        }}
                        className="cursor-pointer hover:text-black"
                      >
                        Logout
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-primary text-white px-5 py-2 rounded-full"
                >
                  Login
                </button>
              )}

              <img
                className="w-5 cursor-pointer"
                src={assets.menu_icon}
                alt="Menu"
                onClick={() => setShowMenu(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          Mobile Menu
      ====================================================== */}

      {showMenu && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="mx-4 sm:mx-[10%]">
            <div className="flex items-center justify-between py-5">
              <img src={assets.logo} alt="Prescripto Logo" />

              <img
                src={assets.cross_icon}
                alt="Close"
                className="w-8 cursor-pointer"
                onClick={() => setShowMenu(false)}
              />
            </div>

            <div className="flex flex-col items-center gap-8 pt-10 text-2xl font-semibold">
              <NavLink
                to="/"
                onClick={() => setShowMenu(false)}
                className="mobile-link"
              >
                Home
              </NavLink>

              <NavLink
                to="/doctors"
                onClick={() => setShowMenu(false)}
                className="mobile-link"
              >
                All Doctors
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setShowMenu(false)}
                className="mobile-link"
              >
                About
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setShowMenu(false)}
                className="mobile-link"
              >
                Contact
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;