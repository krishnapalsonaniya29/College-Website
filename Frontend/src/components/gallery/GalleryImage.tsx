import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function GalleryPagination({
  currentPage,
  totalPages,
  onPageChange,
}: GalleryPaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <nav
      className="flex items-center justify-center gap-2"
      aria-label="Gallery Pagination"
    >
      {/* Previous */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 bg-white transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Previous Page"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
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
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`flex h-11 w-11 items-center justify-center rounded-xl font-medium transition ${
              currentPage === page
                ? "bg-blue-600 text-white shadow-lg"
                : "border border-gray-300 bg-white hover:bg-blue-50"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(Math.min(totalPages, currentPage + 1))
        }
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 bg-white transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Next Page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}