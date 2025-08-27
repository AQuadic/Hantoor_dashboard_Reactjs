import React from "react";
import { useTranslation } from "react-i18next";

export interface FilterObj<T extends string> {
  titleAr: string;
  titleEn: T;
}

interface TabsFilterProps<T extends string> {
  filters: FilterObj<T>[];
  selectedFilter: T;
  setSelectedFilter: React.Dispatch<React.SetStateAction<T>>;
  classNames?: string;
}

const TabsFilter = <T extends string>({
  filters = [],
  selectedFilter,
  setSelectedFilter,
  classNames,
}: TabsFilterProps<T>) => {
  const {
    i18n: { language },
  } = useTranslation();

  if (!filters || filters.length === 0) {
    return null;
  }

  return (
    <div className={`relative flex flex-wrap gap-3 px-8 pb-4 ${classNames}`}>
      {filters.map((filter) => {
        const isSelected = filter.titleEn === selectedFilter;
        return (
          <button
            key={filter.titleEn}
            onClick={() => setSelectedFilter(filter.titleEn)}
            className={`relative px-5 py-2 border-2 border-[#DBDEE1] rounded-lg overflow-hidden ${
              isSelected
                ? "text-white bg-main-black border-none"
                : "text-[#606060]"
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
