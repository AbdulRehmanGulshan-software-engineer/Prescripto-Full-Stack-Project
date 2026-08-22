import React from "react";

const DaySchedule = ({ day, label, value, onChange }) => {
  const handleEnabledChange = (e) => {
    onChange({
      ...value,
      enabled: e.target.checked,
    });
  };

  const handleSessionChange = (index, field, fieldValue) => {
    const updatedSessions = value.sessions.map((session, sessionIndex) =>
      sessionIndex === index
        ? {
            ...session,
            [field]: fieldValue,
          }
        : session,
    );

    onChange({
      ...value,
      sessions: updatedSessions,
    });
  };

  const addSession = () => {
    onChange({
      ...value,
      enabled: true,
      sessions: [
        ...value.sessions,
        {
          start: "09:00",
          end: "17:00",
        },
      ],
    });
  };

  const removeSession = (index) => {
    const updatedSessions = value.sessions.filter(
      (_, sessionIndex) => sessionIndex !== index,
    );

    onChange({
      ...value,
      sessions: updatedSessions,
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium text-gray-700">{label}</p>

          <p className="text-xs text-gray-400">
            {value.enabled ? "Doctor is available" : "Doctor is not available"}
          </p>
        </div>

        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={value.enabled}
            onChange={handleEnabledChange}
            className="h-4 w-4"
          />

          <span className="text-sm text-gray-600">Available</span>
        </label>
      </div>

      {/* Sessions */}
      {value.enabled && (
        <div className="mt-4 space-y-3">
          {value.sessions.map((session, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 sm:flex-row sm:items-end"
            >
              {/* Start */}
              <div className="flex-1">
                <label className="mb-1 block text-xs text-gray-500">
                  Start
                </label>

                <input
                  type="time"
                  value={session.start}
                  onChange={(e) =>
                    handleSessionChange(index, "start", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-gray-400"
                />
              </div>

              {/* End */}
              <div className="flex-1">
                <label className="mb-1 block text-xs text-gray-500">End</label>

                <input
                  type="time"
                  value={session.end}
                  onChange={(e) =>
                    handleSessionChange(index, "end", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-gray-400"
                />
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => removeSession(index)}
                className="rounded-md border border-red-200 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Add session */}
          <button
            type="button"
            onClick={addSession}
            className="text-sm font-medium text-primary hover:underline"
          >
            + Add session
          </button>
        </div>
      )}
    </div>
  );
};

export default DaySchedule;