const DoctorCard = ({ doctor }) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="h-40 w-full object-cover"
      />

      <div className="px-2.5 py-2">
        <h3 className="truncate text-[13px] font-medium text-[#1f2937]">
          {doctor.name}
        </h3>

        <p className="truncate text-[10px] text-[#4b5563]">
          {doctor.speciality}
        </p>
      </div>
    </div>
  );
};

export default DoctorCard;
