import { LayoutGroup, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
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

  // State to track if component is mounted and ready for animations
  const [isMounted, setIsMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Delay mounting to prevent SSR/hydration issues
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Early returns with fallbacks
  if (!filters || filters.length === 0) {
    return null;
  }

  if (hasError) {
    // Fallback UI without animations
    return (
      <div className="relative flex flex-wrap gap-3 px-8 pb-4">
        {filters.map((filter) => {
          const isSelected = filter.titleEn === selectedFilter;
          return (
            <button
              key={filter.titleEn}
              onClick={() => setSelectedFilter(filter.titleEn)}
              className={`relative px-5 py-3 border-2 border-[#DBDEE1] rounded-xl overflow-hidden ${
                isSelected ? "text-white" : "text-black"
              }`}
            >
              {language === "ar" ? filter.titleAr : filter.titleEn}
            </button>
          );
        })}
      </div>
    );
  }

  // Render with animations only after component is mounted
  if (!isMounted) {
    // Initial render without animations to prevent blank page
    return (
      <div className="relative flex flex-wrap gap-3 px-8 pb-4">
        {filters.map((filter) => {
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
                <div className="absolute inset-0 z-0 bg-main-black rounded-xl" />
              )}
              <span className="relative z-10">
                {language === "ar" ? filter.titleAr : filter.titleEn}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // Main render with animations - wrapped in error boundary logic
  try {
    return (
      <LayoutGroup id={`tabs-filter-${Date.now()}`}>
        <div className="relative flex flex-wrap gap-3 px-8 pb-4">
          {filters.map((filter) => {
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
                    layoutId={`tabHighlight-${Date.now()}`}
                    className="absolute inset-0 z-0 bg-main-black rounded-xl"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 0.3,
                    }}
                    onError={() => setHasError(true)}
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
  } catch (error) {
    console.error("Framer Motion error in TabsFilter:", error);
    setHasError(true);

    // Return fallback without animations
    return (
      <div className="relative flex flex-wrap gap-3 px-8 pb-4">
        {filters.map((filter) => {
          const isSelected = filter.titleEn === selectedFilter;
          return (
            <button
              key={filter.titleEn}
              onClick={() => setSelectedFilter(filter.titleEn)}
              className={`relative px-5 py-3 border-2 border-[#DBDEE1] rounded-xl ${
                isSelected ? "text-white bg-main-black" : "text-black"
              }`}
            >
              {language === "ar" ? filter.titleAr : filter.titleEn}
            </button>
          );
        })}
      </div>
    );
  }
};

export default TabsFilter;
