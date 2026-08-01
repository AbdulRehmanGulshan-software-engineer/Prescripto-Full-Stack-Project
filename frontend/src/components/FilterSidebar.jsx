import React from "react";

const FilterSidebar = ({
  specialityData,
  speciality,
  navigate,
  search,
  setSearch,
}) => {
  const filteredSpecialities = specialityData.filter((item) =>
    item.speciality.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full sm:w-64 flex flex-col gap-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search speciality..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
      />

      {/* Specialities */}
      <div className="border border-gray-300 rounded-lg max-h-[450px] overflow-y-auto">
        {filteredSpecialities.length > 0 ? (
          filteredSpecialities.map((item) => (
            <button
              key={item.speciality}
              onClick={() => {
                speciality === item.speciality
                  ? navigate("/doctors")
                  : navigate(`/doctors/${item.speciality}`);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth", // smooth scroll
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
