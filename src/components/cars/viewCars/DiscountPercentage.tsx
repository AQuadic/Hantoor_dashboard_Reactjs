import React from "react";

interface DiscountPercentageProps {
  percentage?: number;
}

const DiscountPercentage = ({ percentage }: DiscountPercentageProps) => {
  return (
    <div
      dir="rtl"
      className="flex items-center justify-between gap-1 bg-[#FF1B5412] max-w-[70px]  p-1 pl-2 rounded-full"
    >
      <img
        draggable={false}
        className="w-[26px] h-[26px]"
        src="/images/redPercentage.png"
      />
      {percentage && (
        <span className="text-sm text-[#FF1C55]">{percentage}%</span>
      )}
    </div>
  );
};

export default DiscountPercentage;
