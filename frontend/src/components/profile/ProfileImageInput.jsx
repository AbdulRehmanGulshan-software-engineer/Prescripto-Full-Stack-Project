import React from "react";

const ProfileImageInput = ({ user, setUser }) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    /*
    =======================================
    
    CURRENT:

    Browser preview using URL


    FUTURE:

    Upload image API

    FormData()
    POST /user/profile/image


    =======================================
    */

    const imageUrl = URL.createObjectURL(file);

    setUser({
      ...user,
      image: imageUrl,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <img
        src={user.image}
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
