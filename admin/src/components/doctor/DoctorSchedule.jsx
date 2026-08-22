import React from "react";

import DaySchedule from "./DaySchedule";

const DoctorSchedule = ({ schedule, setSchedule }) => {
  const days = [
    {
      key: "monday",
      label: "Monday",
    },
    {
      key: "tuesday",
      label: "Tuesday",
    },
    {
      key: "wednesday",
      label: "Wednesday",
    },
    {
      key: "thursday",
      label: "Thursday",
    },
    {
      key: "friday",
      label: "Friday",
    },
    {
      key: "saturday",
      label: "Saturday",
    },
    {
      key: "sunday",
      label: "Sunday",
    },
  ];

  const updateDay = (day, value) => {
    setSchedule((previousSchedule) => ({
      ...previousSchedule,
      [day]: value,
    }));
  };

  return (
    <div className="mt-8">
      <div className="mb-5">
        <p className="text-base font-medium text-gray-700">Doctor Schedule</p>

        <p className="mt-1 text-sm text-gray-400">
          Configure the doctor's weekly working hours.
        </p>
      </div>

      <div className="space-y-4">
        {days.map((day) => (
          <DaySchedule
            key={day.key}
            day={day.key}
            label={day.label}
            value={schedule[day.key]}
            onChange={(value) => updateDay(day.key, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorSchedule;