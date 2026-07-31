import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer aria-label="Footer section">
      <div className="md:mx-10">
        <div className="flex flex-col sm:grid  grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
          {/* ------- Left Section --------- */}
          <div>
            <Link to="/">
              <img
                src={assets.logo}
                alt="Prescripto Logo"
                className="w-40 mb-5 cursor-pointer"
              />
            </Link>
            <p className="w-full md:w-2/3 text-gray-600 leading-6">
              Prescripto is your trusted healthcare companion, making it simple
              to connect with experienced doctors, book appointments, and manage
              your healthcare journey—all from one convenient platform. Our goal
              is to provide accessible, reliable, and hassle-free medical
              services, helping you prioritize your health with confidence.
            </p>
          </div>

          {/* ------------ Central Section --------- */}
          <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
              <li>
                <Link to="/policy">Privacy policy</Link>
              </li>
            </ul>
          </div>

          {/* ------------ Right Section --------- */}

          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="text-gray-600 flex flex-col gap-2">
              <li>+1-111-111-1111</li>
              <li>gulshan.pucit@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* --------- Copyright Text ------------ */}
        <div>
          <hr className="text-gray-400"/>
          <p className="py-5 text-sm text-center">Copyright 2026 Prescripto - All Right Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
