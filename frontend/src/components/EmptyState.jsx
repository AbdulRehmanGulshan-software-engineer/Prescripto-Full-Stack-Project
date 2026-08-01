import React from "react";

const EmptyState = ({
  title = "No Data Found",
  message = "Nothing to display.",
}) => {
  return (
    <div className="flex items-center justify-center h-60 w-full">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
        <p className="mt-2 text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default EmptyState;