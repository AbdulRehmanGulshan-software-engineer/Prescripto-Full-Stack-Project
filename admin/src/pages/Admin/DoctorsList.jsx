import { useEffect, useState } from "react";
import { useAdminDoctors } from "../../context/AdminDoctorsContext";
import DoctorCard from "../../components/DoctorCard";
import DoctorCardSkeleton from "../../components/DoctorCardSkeleton";

const LIMIT = 10;

const DoctorsList = () => {
    const {
        doctors,
        loading,
        error,
        pagination,
        getDoctors,
    } = useAdminDoctors();

    const [page, setPage] = useState(1);

    // =====================================================
    // FETCH DOCTORS
    // =====================================================

    useEffect(() => {
        const controller = new AbortController();

        getDoctors(
            page,
            LIMIT,
            controller.signal
        );

        return () => {
            controller.abort();
        };
    }, [page, getDoctors]);


    // =====================================================
    // PAGE CHANGE
    // =====================================================

    const handlePageChange = (newPage) => {
        if (newPage < 1) return;

        if (newPage > pagination.totalPages) return;

        setPage(newPage);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="min-w-0 w-full">

            {/* =================================================
                HEADER
            ================================================= */}

            <h1 className="mb-5 text-[15px] font-medium text-[#262626]">
                All Doctors
            </h1>


            {/* =================================================
                ERROR
            ================================================= */}

            {!loading && error && (
                <div className="mb-5 flex min-w-0 items-center justify-between rounded-md border border-red-200 bg-red-50 px-4 py-3">

                    <p className="min-w-0 truncate text-xs text-red-600">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => getDoctors(page, LIMIT)}
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
                LOADING SKELETON
            ================================================= */}

            {loading && (
                <div
                    className="
                        grid
                        min-w-0
                        w-full
                        grid-cols-2
                        gap-5
                        sm:grid-cols-3
                        md:grid-cols-4
                        lg:grid-cols-5
                    "
                >
                    {Array.from({ length: LIMIT }).map((_, index) => (
                        <DoctorCardSkeleton key={index} />
                    ))}
                </div>
            )}


            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {!loading && !error && doctors.length === 0 && (
                <div className="flex min-h-[300px] min-w-0 items-center justify-center rounded-md border border-dashed border-gray-300 bg-white">

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
                DOCTORS GRID
            ================================================= */}

            {!loading && !error && doctors.length > 0 && (
                <div
                    className="
                        grid
                        min-w-0
                        w-full
                        grid-cols-2
                        gap-5
                        sm:grid-cols-3
                        md:grid-cols-4
                        lg:grid-cols-5
                    "
                >
                    {doctors.map((doctor) => (
                        <DoctorCard
                            key={doctor._id}
                            doctor={doctor}
                        />
                    ))}
                </div>
            )}


            {/* =================================================
                PAGINATION
            ================================================= */}

            {!loading && !error && doctors.length > 0 && (
                <div className="mt-6 flex items-center justify-center gap-3">

                    {/* Previous */}

                    <button
                        type="button"
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                        className="
                            rounded-md
                            border
                            border-gray-200
                            bg-white
                            px-3
                            py-1.5
                            text-xs
                            text-gray-600
                            transition
                            hover:bg-gray-50
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        Previous
                    </button>


                    {/* Current Page */}

                    <span
                        className="
                            flex
                            h-7
                            min-w-7
                            items-center
                            justify-center
                            rounded-md
                            bg-[#5f6fff]
                            px-2
                            text-xs
                            font-medium
                            text-white
                        "
                    >
                        {pagination.currentPage}
                    </span>


                    {/* Next */}

                    <button
                        type="button"
                        disabled={!pagination.hasMore}
                        onClick={() => handlePageChange(page + 1)}
                        className="
                            rounded-md
                            border
                            border-gray-200
                            bg-white
                            px-3
                            py-1.5
                            text-xs
                            text-gray-600
                            transition
                            hover:bg-gray-50
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        Next
                    </button>

                </div>
            )}

        </div>
    );
};

export default DoctorsList;