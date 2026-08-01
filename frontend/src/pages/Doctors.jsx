import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import DoctorCard from "../components/DoctorCard";
import FilterSidebar from "../components/FilterSidebar";
import EmptyState from "../components/EmptyState";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors, specialityData } = useContext(AppContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <FilterSidebar
          specialityData={specialityData}
          speciality={speciality}
          navigate={navigate}
          search={search}
          setSearch={setSearch}
        />

        <div className="w-full">
          {filterDoc.length > 0 ? (
            <div className="grid grid-cols-auto gap-4 gap-y-6">
              {filterDoc.map((item) => (
                <DoctorCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Doctors Available"
              message="There are no doctors for the selected speciality."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
