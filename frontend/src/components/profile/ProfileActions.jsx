import React from "react";

const ProfileActions = ({ onCancel, onSave }) => {
  return (
    <div
      className="
        mt-10
        flex
        flex-col
        sm:flex-row
        gap-4
      "
    >
      <button
        onClick={onCancel}
        className="
          px-8
          py-2
          rounded-full
          border
          border-gray-400
          hover:bg-gray-100
          transition
        "
      >
        Cancel
      </button>

      <button
        onClick={onSave}
        className="
          px-8
          py-2
          rounded-full
          bg-black
          text-white
          hover:bg-gray-800
          transition
        "
      >
        Save Information
      </button>
    </div>
  );
};

export default ProfileActions;