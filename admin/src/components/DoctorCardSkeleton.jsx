const DoctorCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Image Skeleton */}
      <div className="aspect-square w-full animate-pulse bg-gray-200" />

      {/* Info */}
      <div className="px-2.5 py-2">
        {/* Name Skeleton */}
        <div className="h-[15px] w-[75%] animate-pulse rounded-sm bg-gray-200" />

        {/* Speciality Skeleton */}
        <div className="mt-1.5 h-[11px] w-[55%] animate-pulse rounded-sm bg-gray-100" />
      </div>
    </div>
  );
};

export default DoctorCardSkeleton;
