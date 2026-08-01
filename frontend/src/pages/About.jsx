import React from "react";
import aboutImage from "../assets/about_image.png";

const About = () => {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-10">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center">
        About <span className="text-gray-600">Us</span>
      </h1>

      {/* About Section */}
      <div className="flex flex-col lg:flex-row items-center gap-10 mt-12">
        <img
          className="w-full sm:w-2/3 lg:w-2/5 rounded-lg"
          src={aboutImage}
          alt="About Prescripto"
        />

        <div className="w-full lg:w-3/5 flex flex-col gap-6 text-gray-600 leading-5">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>

          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>

          <div>
            <h2 className="text-xl font-bold text-black mb-2">Our Vision</h2>
            <p>
              Our vision at Prescripto is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          WHY <span className="text-gray-600">CHOOSE US</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">Efficiency</h3>
            <p className="mt-3 text-gray-600">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>

          <div className="border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">Convenience</h3>
            <p className="mt-3 text-gray-600">
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>

          <div className="border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">Personalization</h3>
            <p className="mt-3 text-gray-600">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;