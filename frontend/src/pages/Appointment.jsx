/*
==========================================================
Appointment Page

CURRENT IMPLEMENTATION
----------------------------------------------------------
- Doctor data is fetched from the backend.
- Appointment booking is connected to the backend API.
- JWT authentication is handled through Axios interceptor.
- Appointment slots are currently generated on the frontend
  using dummy/static slot generation.
- Booking response is displayed using React Toastify.
- Related doctors are loaded using existing frontend logic.

FUTURE IMPLEMENTATION
----------------------------------------------------------
- Fetch real available slots from the backend.
- Backend will exclude already booked slots.
- Replace generateSlots() with an API call for available slots.
- Load user's appointments from the backend.
- Add appointment cancellation through the backend API.
- After successful booking, refresh available slots.
- Navigate user to My Appointments after successful booking.

==========================================================
*/

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { useApp } from "../context/useApp";

import generateSlots from "../utils/generateSlots";

import DoctorInfo from "../components/appointment/DoctorInfo";
import BookingSlots from "../components/appointment/BookingSlots";
import BookingButton from "../components/appointment/BookingButton";

import RelatedDoctors from "../components/RelatedDoctors";

import { useAuth } from "../context/useAuth";
import { bookAppointment } from "../services/appointmentService";

import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();

  const { currencySymbol, getDoctor } = useApp();

  const { token } = useAuth();

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
  // CURRENT:
  // Slots are generated on the frontend.
  //
  // FUTURE:
  // Fetch available slots from the backend.
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
    // User must be logged in
    if (!token) {
      toast.error("Please login to book an appointment.");
      return;
    }

    // Time slot must be selected
    if (!slotTime) {
      toast.error("Please select a time slot.");
      return;
    }

    try {
      const slotDate = slots[slotIndex][0].datetime;

      const appointmentData = {
        docId,
        slotDate,
        slotTime,
      };

      console.log("Booking appointment:", appointmentData);

      const response = await bookAppointment(appointmentData);

      if (response.success) {
        toast.success(response.message || "Appointment booked successfully!");

        // Reset selected time after successful booking
        setSlotTime("");
      } else {
        toast.error(response.message || "Failed to book appointment.");
      }
    } catch (error) {
      console.error("Booking Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong while booking appointment.",
      );
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

      <DoctorInfo doctor={doctor} currencySymbol={currencySymbol} />

      {/* ================= BOOKING ================= */}

      <div className="mt-5 sm:ml-72 sm:pl-4">
        <BookingSlots
          slots={slots}
          slotIndex={slotIndex}
          setSlotIndex={setSlotIndex}
          slotTime={slotTime}
          setSlotTime={setSlotTime}
        />

        <BookingButton onBook={handleBooking} />
      </div>

      {/* ================= RELATED DOCTORS ================= */}

      <RelatedDoctors docId={docId} speciality={doctor.speciality} />
    </section>
  );
};

export default Appointment;