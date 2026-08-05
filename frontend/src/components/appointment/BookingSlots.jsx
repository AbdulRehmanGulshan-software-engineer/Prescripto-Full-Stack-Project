import React from "react";

import { DAYS_OF_WEEK } from "../../constants/daysOfWeek";

const BookingSlots = ({
  slots,
  slotIndex,
  setSlotIndex,
  slotTime,
  setSlotTime,
}) => {
  return (
    <>
      <p>Booking Slots</p>

      <div className="mt-4 flex w-full items-center gap-3 overflow-x-auto">
        {slots.length > 0 &&
          slots.map((daySlots, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`min-w-16 cursor-pointer rounded-full py-6 text-center ${
                slotIndex === index
                  ? "bg-primary text-white"
                  : "border border-gray-300"
              }`}
            >
              <p>
                {daySlots[0] &&
                  DAYS_OF_WEEK[
                    daySlots[0].datetime.getDay()
                  ]}
              </p>

              <p>
                {daySlots[0] &&
                  daySlots[0].datetime.getDate()}
              </p>
            </div>
          ))}
      </div>

      <div className="mt-4 flex w-full items-center gap-3 overflow-x-auto">
        {slots.length > 0 &&
          slots[slotIndex]?.map((slot, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                setSlotTime(slot.time)
              }
              className={`flex-shrink-0 rounded-full border px-5 py-2 text-sm ${
                slot.time === slotTime
                  ? "bg-primary text-white"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              {slot.time.toLowerCase()}
            </button>
          ))}
      </div>
    </>
  );
};

export default BookingSlots;