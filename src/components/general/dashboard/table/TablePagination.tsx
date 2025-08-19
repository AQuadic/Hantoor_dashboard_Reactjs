import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface TablePaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  from: number;
  to: number;
}

const generateSteps = (current: number, total: number): (number | string)[] => {
  const pages: (number | string)[] = [];

  pages.push(1);
  if (total >= 2) pages.push(2);

  if (current <= 2) {
    if (total > 4) pages.push("...");
  } else if (current === 3 || current === 4) {
    pages.push("...");
    pages.push(current);
    pages.push("...");
  } else if (current > 4 && current < total - 3) {
    pages.push("...");
    pages.push(current);
    pages.push("...");
  } else if (current >= total - 3) {
    pages.push("...");
    for (let i = total - 4; i <= total - 2; i++) {
      if (i > 2) pages.push(i);
    }
  }

  if (total >= 2) pages.push(total - 1);
  if (total >= 1) pages.push(total);

  return [...new Set(pages)].sort((a, b) =>
    typeof a === "number" && typeof b === "number" ? a - b : 0
  );
};

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  from,
  to,
}) => {
  const steps = generateSteps(currentPage, totalPages);

  const handleStepClick = (step: number | string) => {
    if (typeof step === "number") {
      setCurrentPage(step);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <hr className="border-gray-200" />
      <div className="flex flex-wrap items-center justify-between mt-4 mx-8">
        {to > 0 ? (
          <p className="text-center text-[#808080]">
            من {from} إلى{" "}
            {currentPage < totalPages ? currentPage * itemsPerPage : to} من{" "}
            {totalItems || to} عنصر
          </p>
        ) : (
          <p className="text-center text-[#808080]">لا يوجد عناصر</p>
        )}
        <div className="flex items-center">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`ltr:rotate-180 px-3 py-2 text-sm border rounded-r-md w-[40px] h-[38px] ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50"
                : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            <ChevronRight size={18} className="w-5 h-5" />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {step === "..." ? (
                  <div className="px-3 py-2 text-sm border min-w-[40px] bg-white border-gray-300">
                    ...
                  </div>
                ) : (
                  <button
                    onClick={() => handleStepClick(step)}
                    className={`px-3 py-2 text-sm border min-w-[40px] bg-white ${
                      step === currentPage
                        ? "!bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                        : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    {step}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`ltr:rotate-180 px-3 py-2 text-sm border  bg-white rounded-l-md w-[40px] h-[38px] ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50"
                : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            <ChevronLeft size={18} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
