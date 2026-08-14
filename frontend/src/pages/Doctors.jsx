import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useApp } from "../context/useApp";

import DoctorCard from "../components/DoctorCard";
import FilterSidebar from "../components/FilterSidebar";
import EmptyState from "../components/EmptyState";

const Doctors = () => {
  const navigate = useNavigate();

  const { speciality } = useParams();

  const { doctors, specialityData, loadDoctors, pagination } = useApp();

  // SPECIALTY SEARCH
  const [search, setSearch] = useState("");

  // AVAILABILITY
  const [availability, setAvailability] = useState("all");

  // CURRENT PAGE
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;

  // API VALUE FOR AVAILABILITY
  const available =
    availability === "all" ? undefined : availability === "available";

  // RESET PAGE WHEN SPECIALITY CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [speciality]);

  // LOAD DOCTORS
  useEffect(() => {
    loadDoctors({
      page: currentPage,
      limit,
      available,
      speciality,
    });
  }, [currentPage, availability, speciality]);

  // CHANGE PAGE
  const changePage = (page) => {
    if (page < 1 || page > pagination.totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // CHANGE AVAILABILITY
  const handleAvailabilityChange = (value) => {
    setAvailability(value);

    // Always start from page 1
    setCurrentPage(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <p className="text-gray-600">Browse through the doctors specialist.</p>

      <div className="mt-5 flex flex-col items-start gap-5 sm:flex-row">
        {/* FILTER SIDEBAR */}

        <FilterSidebar
          specialityData={specialityData}
          speciality={speciality}
          navigate={navigate}
          search={search}
          setSearch={setSearch}
          availability={availability}
          setAvailability={handleAvailabilityChange}
        />

        {/* DOCTORS */}

        <div className="w-full">
          {doctors.length > 0 ? (
            <div className="grid grid-cols-auto gap-4 gap-y-6">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} item={doctor} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Doctors Available"
              message="There are no doctors available for the selected filters."
            />
          )}

          {/* PAGINATION */}

          {pagination.totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {/* PREVIOUS */}

              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
                className="rounded border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>

              {/* PAGE NUMBERS */}

              {Array.from(
                {
                  length: pagination.totalPages,
                },
                (_, index) => index + 1,
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => changePage(page)}
                  className={`rounded border px-3 py-2 ${
                    currentPage === page ? "bg-primary text-white" : ""
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* NEXT */}

              <button
                type="button"
                disabled={currentPage === pagination.totalPages}
                onClick={() => changePage(currentPage + 1)}
                className="rounded border px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
