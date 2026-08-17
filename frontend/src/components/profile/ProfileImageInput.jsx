import React, { useEffect, useState } from "react";

const ProfileImageInput = ({ user, setUser }) => {
  const [preview, setPreview] = useState(user.image);

  // Sync preview when user.image changes after API update
  useEffect(() => {
    setPreview(user.image);
  }, [user.image]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    // Show selected image immediately on edit page
    setPreview(imageUrl);

    // Store actual file for API upload
    setUser({
      ...user,
      imageFile: file,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <img
        src={preview}
        alt={user.name}
        className="
          w-32
          h-32
          sm:w-40
          sm:h-40
          object-cover
          rounded-xl
        "
      />

      <label
        className="
          cursor-pointer
          text-blue-600
          font-medium
          text-sm
        "
      >
        Change Profile Picture

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ProfileImageInput;