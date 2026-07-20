import { ChevronLeft, ChevronRight } from "lucide-react";

interface AlumniPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function AlumniPagination({
  currentPage,
  totalPages,
  onPageChange,
}: AlumniPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(
        totalPages - 1,
        currentPage + 1
      );

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2"
      aria-label="Alumni Pagination"
    >
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white transition hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Pages */}
      {getPages().map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-gray-500"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-10 w-10 rounded-lg border font-medium transition ${
              currentPage === page
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-blue-600 hover:bg-blue-50"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white transition hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}

export default AlumniPagination;