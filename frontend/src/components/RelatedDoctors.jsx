import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import DoctorCard from "../components/DoctorCard";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="mt-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Related Doctors
        </h2>
        <p className="text-gray-500 mt-2">
          Explore more doctors with the same speciality.
        </p>
      </div>

      {relDoc.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relDoc.map((doc) => (
            <DoctorCard key={doc._id} item={doc} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500 text-lg">
            No related doctors available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default RelatedDoctors;