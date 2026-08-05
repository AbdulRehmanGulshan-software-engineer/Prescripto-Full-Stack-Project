//when backend get ready delete this generateSlots and use 'const slots=await getAvailableSlots(docId)'

import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { useApp } from "../context/useApp";

import generateSlots from "../utils/generateSlots";

import DoctorInfo from "../components/appointment/DoctorInfo";
import BookingSlots from "../components/appointment/BookingSlots";
import BookingButton from "../components/appointment/BookingButton";

import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();

  const { doctors, currencySymbol } = useApp();
  // Doctor Information
  const doctor = useMemo(() => {
    return doctors.find((doc) => doc._id === docId);
  }, [doctors, docId]);

  // Dummy Slots
  // Future:
  // Replace with API

  const slots = useMemo(() => generateSlots(), []);

  const [slotIndex, setSlotIndex] = useState(0);

  const [slotTime, setSlotTime] = useState("");

  // Book Appointment
  const handleBooking = async () => {
    if (!slotTime) {
      alert("Please select a time slot.");
      return;
    }
    try {
      console.log({
        doctorId: docId,
        slot: slots[slotIndex][0].datetime,
        time: slotTime,
      });

      // Future
      
      // await bookAppointment({
      //
      // doctorId:docId,
      //
      // slotDate:slots[slotIndex][0].datetime,
      //
      // slotTime
      //
      // });

      // toast.success("Appointment Booked");

    } catch (error) {
      console.log(error);
    }
  };

  if (!doctor) {

    return null;

  }

  return (
    <section>
      {/* ================= Doctor ================= */}

      <DoctorInfo
        doctor={doctor}
        currencySymbol={currencySymbol}
      />

      {/* ================= Booking ================= */}

      <div className="mt-5 sm:ml-72 sm:pl-4">

        <BookingSlots
          slots={slots}
          slotIndex={slotIndex}
          setSlotIndex={setSlotIndex}
          slotTime={slotTime}
          setSlotTime={setSlotTime}
        />

        <BookingButton
          onBook={handleBooking}
        />

      </div>

      {/* ================= Related Doctors ================= */}

      <RelatedDoctors
        docId={docId}
        speciality={doctor.speciality}
      />
    </section>
  );
};

export default Appointment;