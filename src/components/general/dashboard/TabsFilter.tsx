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
  filters = [],
  selectedFilter = "",
  setSelectedFilter,
}) => {
  const {
    i18n: { language },
  } = useTranslation();

  if (!filters || filters.length === 0) {
    return null;
  }

  return (
    <div className="relative flex flex-wrap gap-3 px-8 pb-4">
      {filters.map((filter) => {
        const isSelected = filter.titleEn === selectedFilter;
        return (
          <button
            key={filter.titleEn}
            onClick={() => setSelectedFilter(filter.titleEn)}
            className={`relative px-5 py-3 border-2 border-[#DBDEE1] rounded-xl overflow-hidden ${
              isSelected ? "text-white bg-main-black" : "text-black"
            }`}
          >
            {language === "ar" ? filter.titleAr : filter.titleEn}
          </button>
        );
      })}
    </div>
  );
};

export default TabsFilter;
