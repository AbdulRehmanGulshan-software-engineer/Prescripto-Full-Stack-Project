import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(true);
  // Mobile navigation menu
  const [showMenu, setShowMenu] = useState(false);
  // Profile dropdown
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav aria-label="Main navigation">
      <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
        {/* Logo */}
        <NavLink to="/">
          <img
            className="w-44 cursor-pointer"
            src={assets.logo}
            alt="Prescripto Logo"
          />
        </NavLink>
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-start gap-5 font-medium">
          <NavLink to="/">
            <li className="py-1">HOME</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/doctors">
            <li className="py-1">All DOCTORS</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/about">
            <li className="py-1">ABOUT</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/contact">
            <li className="py-1">CONTACT</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
        </ul>
        {/* RightSide */}
        <div className="flex items-center">
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-2 cursor-pointer group relative">
                <img
                  className="w-8 rounded-full "
                  src={assets.profile_pic}
                  alt="User's profile picture"
                />
                <img
                  className="w-2.5"
                  src={assets.dropdown_icon}
                  alt="Dropdown icon"
                />

                {/* created dropdown */}
                <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                  <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                    <p
                      onClick={() => navigate("/my-profile")}
                      className="hover:text-black cursor-pointer"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => navigate("/my-appointments")}
                      className="hover:text-black cursor-pointer"
                    >
                      My Appointments
                    </p>
                    <p
                      onClick={() => setToken(false)}
                      className="hover:text-black cursor-pointer"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-primary text-white rounded-full font-light px-8 py-3"
              >
                Create Account
              </button>
            )}
          </div>
          {/* Mobile */}
          {/* Mobile Content */}
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
                  <img src={assets.dropdown_icon} alt="" />
                </div>
                {showProfileMenu && (
                  <div className="absolute right-0 top-10">
                    {/* dropdown here */}
                    <div className="min-w-48 bg-white rounded-lg shadow-lg p-4 flex flex-col gap-3">
                      <p
                        onClick={() => {
                          navigate("/my-profile");
                          setShowProfileMenu(false);
                          setShowMenu(false);
                        }}
                        className="hover:text-black cursor-pointer"
                      >
                        My Profile
                      </p>
                      <p
                        onClick={() => {
                          navigate("/my-appointments");
                          setShowProfileMenu(false);
                          setShowMenu(false);
                        }}
                        className="hover:text-black cursor-pointer"
                      >
                        My Appointments
                      </p>
                      <p
                        onClick={() => {
                          setToken(false);
                          setShowProfileMenu(false);
                          setShowMenu(false);
                        }}
                        className="hover:text-black cursor-pointer"
                      >
                        Logout
                      </p>
                    </div>
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
              className="w-5"
              src={assets.menu_icon}
              alt=""
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="fixed top-0 right-0 h-screen w-full bg-white">
          <div className="flex items-center justify-between text-sm py-5 px-3">
            {/* Logo */}
            <img src={assets.logo} alt="Prescripto Logo" />
            {/* Close icon */}
            <img
              src={assets.cross_icon}
              alt="Cross Icon"
              className="w-8 p-1"
              onClick={() => setShowMenu(false)}
            />
          </div>

          {/* NavLinks */}
          <div className="flex flex-col items-center gap-8 pt-10 text-2xl font-semibold ">
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
      )}
    </nav>
  );
};

export default Navbar;
