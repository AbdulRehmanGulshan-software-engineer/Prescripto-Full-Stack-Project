import React from "react";

const BookingButton = ({ onBook }) => {
  return (
    <button
      onClick={onBook}
      className="my-6 rounded-full bg-primary px-14 py-3 text-sm font-light text-white"
    >
      Book Appointment
    </button>
  );
};

export default BookingButton;