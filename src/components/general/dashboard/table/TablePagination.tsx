import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface TablePaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const generateSteps = (current: number, last: number): (number | string)[] => {
  const steps: (number | string)[] = [];
  const lastStepsStart = Math.max(last - 2, current + 3);

  for (let i = current; i <= Math.min(current + 2, lastStepsStart - 1); i++) {
    steps.push(i);
  }

  if (current + 2 < lastStepsStart - 1) {
    steps.push("...");
  }

  for (let i = lastStepsStart; i <= last; i++) {
    steps.push(i);
  }

  return steps;
};

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  totalItems,
  itemsPerPage,
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
        <p className="text-center text-[#808080]">
          العدد {itemsPerPage} من {totalItems} عنصر
        </p>
        <div className="flex items-center">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-3 py-2 text-sm border rounded-r-md w-[40px] h-[38px] ${
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
            className={`px-3 py-2 text-sm border  bg-white rounded-l-md w-[40px] h-[38px] ${
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
