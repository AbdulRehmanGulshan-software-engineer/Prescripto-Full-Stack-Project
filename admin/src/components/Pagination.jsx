const getPaginationItems = (currentPage, totalPages) => {
    if (totalPages <= 5) {
        return Array.from(
            { length: totalPages },
            (_, index) => index + 1
        );
    }

    const pages = [];

    // First page
    pages.push(1);

    // Near beginning
    if (currentPage <= 3) {
        pages.push(2);
        pages.push(3);
        pages.push("...");
        pages.push(totalPages);

        return pages;
    }

    // Near end
    if (currentPage >= totalPages - 2) {
        pages.push("...");
        pages.push(totalPages - 2);
        pages.push(totalPages - 1);
        pages.push(totalPages);

        return pages;
    }

    // Middle
    pages.push("...");
    pages.push(currentPage - 1);
    pages.push(currentPage);
    pages.push(currentPage + 1);
    pages.push("...");
    pages.push(totalPages);

    return pages;
};


const Pagination = ({
    currentPage,
    totalPages,
    hasMore,
    loading,
    onPageChange,
}) => {

    if (totalPages <= 1) {
        return null;
    }


    const paginationItems = getPaginationItems(
        currentPage,
        totalPages
    );


    return (
        <div className="mt-8 flex w-full justify-center pb-6">

            <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">

                {/* Previous */}

                <button
                    type="button"
                    disabled={
                        currentPage === 1 ||
                        loading
                    }
                    onClick={() =>
                        onPageChange(currentPage - 1)
                    }
                    className="
                        rounded-md
                        px-3
                        py-2
                        text-xs
                        font-medium
                        text-gray-600
                        transition
                        hover:bg-gray-50
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    Previous
                </button>


                {/* Page Numbers */}

                {paginationItems.map((item, index) => {

                    if (item === "...") {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    text-xs
                                    text-gray-400
                                "
                            >
                                ...
                            </span>
                        );
                    }


                    const isActive =
                        item === currentPage;


                    return (
                        <button
                            key={item}
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                onPageChange(item)
                            }
                            className={`
                                flex
                                h-8
                                min-w-8
                                items-center
                                justify-center
                                rounded-md
                                px-2
                                text-xs
                                font-medium
                                transition

                                ${
                                    isActive
                                        ? "bg-[#5f6fff] text-white"
                                        : "text-gray-600 hover:bg-gray-50"
                                }

                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            `}
                        >
                            {item}
                        </button>
                    );
                })}


                {/* Next */}

                <button
                    type="button"
                    disabled={
                        !hasMore ||
                        currentPage === totalPages ||
                        loading
                    }
                    onClick={() =>
                        onPageChange(currentPage + 1)
                    }
                    className="
                        rounded-md
                        px-3
                        py-2
                        text-xs
                        font-medium
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

        </div>
    );
};


export default Pagination;