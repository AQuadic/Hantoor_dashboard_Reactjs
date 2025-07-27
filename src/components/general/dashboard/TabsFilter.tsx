import { LayoutGroup, motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";

interface filterType {
  titleEn: string;
  titleAr: string;
}

interface TabsFilterProps {
  filters: filterType[];
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const TabsFilter: React.FC<TabsFilterProps> = ({
  filters,
  selectedFilter,
  setSelectedFilter,
}) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <LayoutGroup>
      <div className="relative flex flex-wrap gap-3 px-8 pb-4">
        {filters.map((filter) => {
          // You may want to use titleEn or titleAr for selection, here using titleEn
          const isSelected = filter.titleEn === selectedFilter;

          return (
            <button
              key={filter.titleEn}
              onClick={() => setSelectedFilter(filter.titleEn)}
              className={`relative px-5 py-3 border-2 border-[#DBDEE1] rounded-xl overflow-hidden ${
                isSelected ? "text-white" : "text-black"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="tabHighlight"
                  className="absolute inset-0 z-0 bg-main-black rounded-xl"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {language === "ar" ? filter.titleAr : filter.titleEn}
              </span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
};

export default TabsFilter;
