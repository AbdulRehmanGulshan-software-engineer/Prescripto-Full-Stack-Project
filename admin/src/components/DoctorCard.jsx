const DoctorCard = ({ doctor, onAvailabilityChange }) => {
  return (
    <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group">
      <img
        className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
        src={doctor.image}
        alt=""
      />

      <div className="p-4">
        <p className="text-neutral-800 text-lg font-medium">{doctor.name}</p>

        <p className="text-zinc-600 text-sm">{doctor.speciality}</p>

        <div className="mt-2 flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={doctor.available}
            onChange={() => {
              console.log("CLICKED:", doctor._id);
              onAvailabilityChange(doctor._id);
            }}
          />

          <p>Available</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
