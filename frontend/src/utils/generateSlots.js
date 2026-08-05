/*
NOTE

This utility generates dummy appointment slots.

Currently used because the backend is not ready.

When backend APIs are available,
this file will no longer be used.

The frontend will simply fetch available slots
from the backend.

*/

const generateSlots = () => {
  const slots = [];

  const today = new Date();

  for (let day = 0; day < 7; day++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + day);

    const endTime = new Date(currentDate);
    endTime.setHours(21, 0, 0, 0);

    if (day === 0) {
      currentDate.setHours(
        currentDate.getHours() > 10
          ? currentDate.getHours() + 1
          : 10
      );

      currentDate.setMinutes(
        currentDate.getMinutes() > 30
          ? 30
          : 0
      );
    } else {
      currentDate.setHours(10, 0, 0, 0);
    }

    const daySlots = [];

    while (currentDate < endTime) {
      daySlots.push({
        datetime: new Date(currentDate),

        time: currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      });

      currentDate.setMinutes(
        currentDate.getMinutes() + 30
      );
    }

    slots.push(daySlots);
  }

  return slots;
};

export default generateSlots;