import { useEffect, useState } from "react";

import { useAdminDoctors } from "../../hooks/useAdminDoctors";

import DoctorCard from "../../components/DoctorCard";
import DoctorCardSkeleton from "../../components/DoctorCardSkeleton";
import Pagination from "../../components/Pagination";

const LIMIT = 10;

const DoctorsList = () => {
  const {
    doctors,
    loading,
    error,
    pagination,
    getDoctors,
    changeAvailability,
  } = useAdminDoctors();

  const [page, setPage] = useState(1);

  // =====================================================
  // FETCH DOCTORS + SCROLL TO TOP
  // =====================================================

  useEffect(() => {
    const controller = new AbortController();

    // Scroll whenever page changes
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    getDoctors(page, LIMIT, controller.signal);

    return () => {
      controller.abort();
    };
  }, [page, getDoctors]);

  // =====================================================
  // PAGE CHANGE
  // =====================================================

  const handlePageChange = (newPage) => {
    // Don't change page while loading
    if (loading) {
      return;
    }

    // Invalid page
    if (newPage < 1) {
      return;
    }

    // Page doesn't exist
    if (newPage > pagination.totalPages) {
      return;
    }

    // Already on this page
    if (newPage === page) {
      return;
    }

    setPage(newPage);
  };

  // =====================================================
  // RETRY
  // =====================================================

  const handleRetry = () => {
    getDoctors(page, LIMIT);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="m-5 w-full min-w-0 max-w-full">
      {/* =================================================
                HEADER
            ================================================= */}

      <div className="mb-5">
        <h1 className="text-lg font-medium text-gray-800">All Doctors</h1>

        {!loading && !error && (
          <p className="mt-1 text-xs text-gray-400">
            {pagination.totalDoctors}{" "}
            {pagination.totalDoctors === 1 ? "doctor" : "doctors"}
          </p>
        )}
      </div>

      {/* =================================================
                ERROR
            ================================================= */}

      {!loading && error && (
        <div
          className="
                        mb-5
                        flex
                        min-w-0
                        items-center
                        justify-between
                        gap-3
                        rounded-lg
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                    "
        >
          <p className="min-w-0 truncate text-xs text-red-600">{error}</p>

          <button
            type="button"
            onClick={handleRetry}
            className="
                            ml-3
                            shrink-0
                            rounded-md
                            bg-red-500
                            px-3
                            py-1.5
                            text-xs
                            text-white
                            transition
                            hover:bg-red-600
                        "
          >
            Retry
          </button>
        </div>
      )}

      {/* =================================================
                LOADING
            ================================================= */}

      {loading && (
        <div
          className="
                        grid
                        w-full
                        min-w-0
                        grid-cols-2
                        gap-4
                        sm:grid-cols-3
                        md:grid-cols-4
                        lg:grid-cols-4
                    "
        >
          {Array.from({
            length: LIMIT,
          }).map((_, index) => (
            <DoctorCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* =================================================
                EMPTY
            ================================================= */}

      {!loading && !error && doctors.length === 0 && (
        <div
          className="
                            flex
                            min-h-[300px]
                            w-full
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-dashed
                            border-gray-300
                            bg-white
                        "
        >
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">
              No doctors found
            </p>

            <p className="mt-1 text-xs text-gray-400">
              There are no doctors available right now.
            </p>
          </div>
        </div>
      )}

      {/* =================================================
                DOCTORS
            ================================================= */}

      {!loading && !error && doctors.length > 0 && (
        <div
          className="
                            grid
                            w-full
                            min-w-0
                            grid-cols-2
                            gap-4
                            sm:grid-cols-3
                            md:grid-cols-4
                            lg:grid-cols-4
                        "
        >
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              onAvailabilityChange={changeAvailability}
            />
          ))}
        </div>
      )}

      {/* =================================================
                PAGINATION
            ================================================= */}

      {!loading && !error && doctors.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={pagination.totalPages}
          hasMore={pagination.hasMore}
          loading={loading}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default DoctorsList;
