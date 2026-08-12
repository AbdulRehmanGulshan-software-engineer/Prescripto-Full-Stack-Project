const DoctorCardSkeleton = () => {
  return (
    <div
      className="
                w-full
                max-w-56
                min-w-0
                overflow-hidden
                rounded-xl
                border
                border-gray-200
                bg-white
            "
    >
      {/* Image Skeleton */}

      <div
        className="
                    aspect-[4/3]
                    w-full
                    animate-pulse
                    bg-gray-200
                "
      />

      {/* Content Skeleton */}

      <div className="p-4">
        {/* Name */}

        <div
          className="
                        h-5
                        w-[75%]
                        animate-pulse
                        rounded
                        bg-gray-200
                    "
        />

        {/* Speciality */}

        <div
          className="
                        mt-2
                        h-4
                        w-[55%]
                        animate-pulse
                        rounded
                        bg-gray-100
                    "
        />

        {/* Availability */}

        <div className="mt-3 flex items-center gap-2">
          <div
            className="
                            h-4
                            w-4
                            animate-pulse
                            rounded
                            bg-gray-200
                        "
          />

          <div
            className="
                            h-4
                            w-20
                            animate-pulse
                            rounded
                            bg-gray-100
                        "
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorCardSkeleton;