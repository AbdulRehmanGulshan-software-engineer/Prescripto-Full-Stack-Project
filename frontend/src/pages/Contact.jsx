import React from "react";
import contactImage from "../assets/contact_image.png";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-12">
      {/* Heading */}
      <h1 className="text-3xl font-semibold text-center text-gray-700">
        CONTACT <span className="text-gray-400">US</span>
      </h1>

      {/* Content */}
      <div className="mt-14 flex flex-col lg:flex-row items-center justify-center gap-14">
        {/* Image */}
        <img
          src={contactImage}
          alt="Contact"
          className="w-full sm:w-4/5 lg:w-2/5 rounded-lg"
        />

        {/* Info */}
        <div className="w-full lg:w-2/5 flex flex-col gap-7 text-gray-500">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              OUR OFFICE
            </h2>

            <p>54709 Willms Station</p>
            <p>Suite 350, Washington, USA</p>
          </div>

          <div>
            <p>Tel: (415) 555-0132</p>
            <p>Email: greatstackdev@gmail.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Careers at Prescripto
            </h2>
            <p>Learn more about our teams and job openings.</p>
          </div>

          <button className="w-fit border border-gray-300 px-6 py-3 rounded-md text-gray-600 hover:bg-gray-100 transition">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
