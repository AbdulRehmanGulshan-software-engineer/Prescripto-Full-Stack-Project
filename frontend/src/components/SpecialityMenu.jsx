import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-gray-800"
    >
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-medium">Find By Speciality</h1>

        <p className="mt-3 max-w-2xl mx-auto text-sm text-gray-600">
          Simply browse through our extensive list of trusted doctors and
          schedule your appointment hassle-free.
        </p>
      </div>

      {/* Specialities */}
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        {specialityData.slice(0, 8).map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="flex w-24 flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2"
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-16 h-16 object-contain"
            />
            <p className="mt-3 text-xs font-medium">{item.speciality}</p>
          </Link>
        ))}
      </div>

      {/* View All */}
      <div className="mt-10 text-center">
        <Link
          to="/doctors"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="inline-flex rounded-full bg-indigo-100 px-6 py-3 text-sm font-medium text-indigo-700 transition hover:bg-indigo-200"
        >
          View All Specialities
        </Link>
      </div>
    </section>
  );
};

export default SpecialityMenu;
