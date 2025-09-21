import React from "react";

interface TableImagePlaceholderProps {
  className?: string;
  ariaLabel?: string;
}

const TableImagePlaceholder: React.FC<TableImagePlaceholderProps> = ({
  className = "w-10 h-10",
  ariaLabel = "no-image",
}) => {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`${className} flex items-center justify-center bg-gray-100 rounded-md text-gray-400`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-5 h-5"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
        <circle cx="8.5" cy="10.5" r="1.5" />
        <path d="M21 15l-5-5-4 4-3-3-4 4" />
      </svg>
    </div>
  );
};

export default TableImagePlaceholder;
