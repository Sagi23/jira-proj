import React, { FC } from "react";
import "../app/globals.css";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalIssues: number;
  isLoading: boolean;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalIssues,
  isLoading,
}) => {
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalIssues - 1);

  const displayStart = startIndex + 1;
  const displayEnd = endIndex + 1;

  return (
    <div className="mt-6">
      <div className="flex flex-col items-center">
        <span className="text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {displayStart}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {displayEnd}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalIssues}
          </span>{" "}
          Issues
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            disabled={currentPage === 1 || isLoading}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:bg-gray-500 disabled:hover:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            disabled={endIndex === totalIssues - 1 || isLoading}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:bg-gray-500 disabled:hover:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
