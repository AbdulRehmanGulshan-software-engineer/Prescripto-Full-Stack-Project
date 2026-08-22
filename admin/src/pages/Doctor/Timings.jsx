import React, { useState } from "react";

import { toast } from "react-toastify";

import DoctorSchedule from "../../components/doctor/DoctorSchedule";

import { DEFAULT_DOCTOR_SCHEDULE } from "../../constants/defaultDoctorSchedule";

const Timings = () => {
  // =========================================================
  // CURRENT:
  // Schedule is currently stored only in React state.
  //
  // IMPORTANT:
  // If the page is refreshed, React state will reset and
  // DEFAULT_DOCTOR_SCHEDULE will be shown again.
  //
  // FUTURE:
  // We will fetch the doctor's saved schedule from the backend
  // using the doctor's dToken and set it here.
  // =========================================================

  const [schedule, setSchedule] = useState(DEFAULT_DOCTOR_SCHEDULE);

  // =========================================================
  // CURRENT:
  // Save button only prints the schedule to the console and
  // shows a success toast.
  //
  // FUTURE:
  // This will send the schedule to the backend using an API
  // endpoint such as:
  //
  // PUT /api/doctor/schedule
  //
  // The backend will save the schedule in the doctor's
  // MongoDB document.
  // =========================================================

  const handleSave = (event) => {
    event.preventDefault();

    // Current temporary behaviour
    console.log("Doctor Schedule:", schedule);

    toast.success("Timings saved successfully");
  };

  return (
    <form onSubmit={handleSave} className="m-5 w-full">
      <div className="w-full max-w-5xl rounded-lg border border-gray-200 bg-white px-8 py-8">
        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="mb-6">
          <p className="text-base font-medium text-gray-700">Weekly Schedule</p>

          <p className="mt-1 text-sm text-gray-400">
            Set your working hours for each day.
          </p>
        </div>

        {/* =====================================================
            DOCTOR SCHEDULE

            CURRENT:
            Reusable DoctorSchedule component manages the
            weekly working hours in React state.

            FUTURE:
            When the page loads, the schedule will be fetched
            from the backend and passed into this component.

            Example:

            GET /api/doctor/schedule

            Then:

            setSchedule(data.schedule)
            ===================================================== */}

        <DoctorSchedule schedule={schedule} setSchedule={setSchedule} />

        {/* =====================================================
            SAVE BUTTON

            CURRENT:
            Saves nothing to the database.
            It only logs the schedule and shows a toast.

            FUTURE:
            Send schedule to backend:

            PUT /api/doctor/schedule

            The backend will save it against the logged-in
            doctor's ID obtained from dToken.
            ===================================================== */}

        <button
          type="submit"
          className="mt-8 rounded-full bg-primary px-10 py-3 text-sm text-white transition hover:opacity-90"
        >
          Save Timings
        </button>
      </div>
    </form>
  );
};

export default Timings;