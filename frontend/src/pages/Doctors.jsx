import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useApp } from "../context/useApp";

import DoctorCard from "../components/DoctorCard";
import FilterSidebar from "../components/FilterSidebar";
import EmptyState from "../components/EmptyState";

const Doctors = () => {
  const navigate = useNavigate();

  const { speciality } = useParams();

  const { doctors, specialityData } = useApp();

  const [search, setSearch] = useState("");

  // Filter Doctors
  const filteredDoctors = useMemo(() => {
    let filtered = doctors;

    // Filter By Speciality

    if (speciality) {
      filtered = filtered.filter(
        (doctor) => doctor.speciality === speciality
      );
    }

    // Future

    // Search Filter

    if (search.trim()) {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [doctors, speciality, search]);

  return (
    <section>
      <p className="text-gray-600">
        Browse through the doctors specialist.
      </p>

      <div className="mt-5 flex flex-col items-start gap-5 sm:flex-row">
        <FilterSidebar
          specialityData={specialityData}
          speciality={speciality}
          navigate={navigate}
          search={search}
          setSearch={setSearch}
        />

        <div className="w-full">
          {filteredDoctors.length ? (
            <div className="grid grid-cols-auto gap-4 gap-y-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor._id}
                  item={doctor}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Doctors Available"
              message="There are no doctors available for the selected speciality."
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Doctors;