'use client';

import { getPageNumbers, getPaginationText, PaginationResult } from '../utils/paginateProducts';
import { ShopFilters } from '../hooks/useShopState';

interface PaginationProps {
  result: PaginationResult<unknown>;
  onChange: (updates: Partial<ShopFilters>) => void;
}

export default function Pagination({ result, onChange }: PaginationProps) {
  const { currentPage, totalPages, hasNextPage, hasPreviousPage } = result;

  // Don't show pagination if only one page or no products
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const paginationText = getPaginationText(result);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onChange({ page });
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav aria-label="Pagination" className="flex flex-col items-center gap-3 sm:gap-4 py-6 sm:py-8 w-full">
      {/* Pagination text */}
      <p className="text-xs sm:text-sm text-gray-600 text-center">{paginationText}</p>

      {/* Pagination controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-full">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!hasPreviousPage}
          aria-label="Go to previous page"
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] min-h-[40px] ${
            hasPreviousPage
              ? 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Previous
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1">
          {pageNumbers.map((pageNum, index) => {
            if (pageNum === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-2 text-gray-400 text-xs sm:text-sm"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                aria-label={`Go to page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
                className={`min-w-[36px] sm:min-w-[40px] h-[36px] sm:h-[40px] px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] flex items-center justify-center ${
                  isActive
                    ? 'bg-[#B88E2F] text-white font-bold'
                    : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
          aria-label="Go to next page"
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E2F] min-h-[40px] ${
            hasNextPage
              ? 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </nav>
  );
}
