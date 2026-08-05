import React from "react";

const ProfileContactForm = ({ user, setUser }) => {
  return (
    <>
      <h3
        className="
          text-sm
          uppercase
          tracking-wide
          font-semibold
          text-gray-500
        "
      >
        Contact Information
      </h3>

      <div className="mt-5 space-y-5">
        <Row label="Email">
          <input
            value={user.email}
            readOnly
            className="
              w-full
              sm:w-96
              border
              rounded-lg
              px-4
              py-2
              bg-gray-100
            "
          />
        </Row>

        <Row label="Phone">
          <input
            value={user.phone}
            onChange={(e) =>
              setUser({
                ...user,
                phone: e.target.value,
              })
            }
            className="
              w-full
              sm:w-96
              border
              rounded-lg
              px-4
              py-2
              outline-none
            "
          />
        </Row>

        <Row label="Address">
          <textarea
            rows={3}
            value={user.address}
            onChange={(e) =>
              setUser({
                ...user,
                address: e.target.value,
              })
            }
            className="
              w-full
              sm:w-96
              border
              rounded-lg
              px-4
              py-2
              resize-none
              outline-none
            "
          />
        </Row>
      </div>
    </>
  );
};

const Row = ({ label, children }) => (
  <div
    className="
      flex
      flex-col
      sm:flex-row
      sm:items-center
      sm:gap-8
    "
  >
    <p className="font-semibold min-w-[130px]">{label}</p>

    {children}
  </div>
);

export default ProfileContactForm;