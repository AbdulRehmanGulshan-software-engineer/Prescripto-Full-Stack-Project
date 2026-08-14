import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { useApp } from "../context/useApp";

import generateSlots from "../utils/generateSlots";

import DoctorInfo from "../components/appointment/DoctorInfo";
import BookingSlots from "../components/appointment/BookingSlots";
import BookingButton from "../components/appointment/BookingButton";

import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {

  const { docId } = useParams();


  const {
    currencySymbol,
    getDoctor,
  } = useApp();


  // ==========================================
  // DOCTOR
  // ==========================================

  const [doctor, setDoctor] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const loadDoctor = async () => {

      try {

        setLoading(true);

        const doctorData = await getDoctor(docId);

        setDoctor(doctorData);

      } catch (error) {

        console.error("Failed to load doctor:", error);

      } finally {

        setLoading(false);
      }
    };


    if (docId) {
      loadDoctor();
    }

  }, [docId]);


  // ==========================================
  // DUMMY SLOTS
  // ==========================================

  // TODO:
  // When backend is ready:
  //
  // const slots = await getAvailableSlots(docId);

  const slots = useMemo(() => generateSlots(), []);


  // ==========================================
  // BOOKING STATE
  // ==========================================

  const [slotIndex, setSlotIndex] = useState(0);

  const [slotTime, setSlotTime] = useState("");


  // ==========================================
  // BOOK APPOINTMENT
  // ==========================================

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


      // Future:
      //
      // await bookAppointment({
      //   doctorId: docId,
      //   slotDate: slots[slotIndex][0].datetime,
      //   slotTime,
      // });


    } catch (error) {

      console.error(error);

    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <section>
        <p>Loading doctor...</p>
      </section>
    );
  }


  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!doctor) {

    return (
      <section>
        <p>Doctor not found.</p>
      </section>
    );
  }


  // ==========================================
  // UI
  // ==========================================

  return (

    <section>

      {/* ================= DOCTOR ================= */}

      <DoctorInfo
        doctor={doctor}
        currencySymbol={currencySymbol}
      />


      {/* ================= BOOKING ================= */}

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


      {/* ================= RELATED DOCTORS ================= */}

      <RelatedDoctors
        docId={docId}
        speciality={doctor.speciality}
      />

    </section>
  );
};

export default Appointment;