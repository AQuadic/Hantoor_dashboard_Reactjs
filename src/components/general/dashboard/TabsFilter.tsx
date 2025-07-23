import { LayoutGroup, motion } from "framer-motion";
import React from "react";

interface TabsFilterProps {
  filters: string[];
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const TabsFilter: React.FC<TabsFilterProps> = ({
  filters,
  selectedFilter,
  setSelectedFilter,
}) => {
  return (
    <LayoutGroup>
      <div className="flex flex-wrap gap-3 relative">
        {filters.map((filter) => {
          const isSelected = filter === selectedFilter;

          return (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`relative px-5 py-3 border-2 border-[#DBDEE1] rounded-xl overflow-hidden ${
                isSelected ? "text-white" : "text-black"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="tabHighlight"
                  className="absolute inset-0 bg-main-black rounded-xl z-0"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
};

export default TabsFilter;
