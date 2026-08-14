import React from "react";

const FilterSidebar = ({
  specialityData,
  speciality,
  navigate,
  search,
  setSearch,
  availability,
  setAvailability,
}) => {
  // Search only speciality list
  const filteredSpecialities = specialityData.filter((item) =>
    item.speciality.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const handleAvailabilityChange = (value) => {
    setAvailability(value);
  };

  return (
    <div className="w-full sm:w-64 flex flex-col gap-4">
      {/* ================= SEARCH SPECIALITY ================= */}

      <input
        type="text"
        placeholder="Search speciality..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
      />

      {/* ================= AVAILABILITY ================= */}

      <div className="border border-gray-300 rounded-lg p-4">
        <p className="text-sm font-medium text-gray-700 mb-3">Availability</p>

        <div className="flex flex-col gap-2">
          {/* ALL */}

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="availability"
              value="all"
              checked={availability === "all"}
              onChange={() => handleAvailabilityChange("all")}
            />

            <span className="text-sm text-gray-700">All Doctors</span>
          </label>

          {/* AVAILABLE */}

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="availability"
              value="available"
              checked={availability === "available"}
              onChange={() => handleAvailabilityChange("available")}
            />

            <span className="text-sm text-gray-700">Available</span>
          </label>

          {/* NOT AVAILABLE */}

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="availability"
              value="unavailable"
              checked={availability === "unavailable"}
              onChange={() => handleAvailabilityChange("unavailable")}
            />

            <span className="text-sm text-gray-700">Not Available</span>
          </label>
        </div>
      </div>

      {/* ================= SPECIALITIES ================= */}

      <div className="border border-gray-300 rounded-lg max-h-[450px] overflow-y-auto">
        {filteredSpecialities.length > 0 ? (
          filteredSpecialities.map((item) => (
            <button
              key={item.speciality}
              type="button"
              onClick={() => {
                if (speciality === item.speciality) {
                  navigate("/doctors");
                } else {
                  navigate(`/doctors/${item.speciality}`);
                }

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className={`w-full text-left px-4 py-3 border-b last:border-b-0 transition ${
                speciality === item.speciality
                  ? "bg-indigo-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.speciality}
            </button>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500 text-sm">
            No speciality found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;