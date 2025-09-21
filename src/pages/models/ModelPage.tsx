import React, { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { useDatePicker } from "@/hooks/useDatePicker";
import ModelHeader from "@/components/models/ModelHeader";
import { ModelTable } from "@/components/models/ModelTable";
import { StructureTable } from "@/components/models/StructureTable";
import { CarTypesTable } from "@/components/models/CatTypesTable";
import { CategoriesTable } from "@/components/models/CategoriesTable";
import { BrandOriginTable } from "@/components/models/BrandOriginTable";
import { NumberOfSeatsTable } from "@/components/models/NumberOfSeatsTable";
import { EngineTypesTable } from "@/components/models/EngineTypesTable";
import { EngineSizesTable } from "@/components/models/EngineSizesTable";
import { PriceFromTable } from "@/components/models/PriceFromTable";
import { PriceToTable } from "@/components/models/PriceToTable";

const BrandsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const sectionParam = searchParams.get("section") || "Models";
  const pageParam = parseInt(searchParams.get("page") || "1");

  const [selectedTab, setSelectedTab] = useState(sectionParam);
  const [currentPage, setCurrentPage] = useState(pageParam);

  // Wrapper functions that update both state and URL
  const handleTabChange = useCallback(
    (value: React.SetStateAction<string>) => {
      const newTab = typeof value === "function" ? value(selectedTab) : value;
      setSelectedTab(newTab);
      setCurrentPage(1); // Reset page when changing tabs
      setSearch("");

      // Update URL when user changes tab
      const newParams = new URLSearchParams(searchParams);
      newParams.set("section", newTab);
      newParams.set("page", "1");
      setSearchParams(newParams, { replace: true });
    },
    [selectedTab, searchParams, setSearchParams]
  );

  const handlePageChange = useCallback(
    (value: React.SetStateAction<number>) => {
      const newPage = typeof value === "function" ? value(currentPage) : value;
      setCurrentPage(newPage);

      // Update URL when user changes page
      const newParams = new URLSearchParams(searchParams);
      newParams.set("section", selectedTab);
      newParams.set("page", newPage.toString());
      setSearchParams(newParams, { replace: true });
    },
    [currentPage, selectedTab, searchParams, setSearchParams]
  );

  const [search, setSearch] = useState("");
  const { dateRange, setDateRange, dateParams } = useDatePicker();
  const [paginationMeta, setPaginationMeta] = useState({
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    from: 0,
    to: 0,
  });

  const handleSetPagination = useCallback((meta: typeof paginationMeta) => {
    setPaginationMeta(meta);
  }, []);

  const renderTable = () => {
    switch (selectedTab) {
      case "Structure Types":
        return (
          <>
            <StructureTable
              search={search}
              page={currentPage}
              setPagination={handleSetPagination}
            />
          </>
        );
      case "Brand Origin":
        return (
          <>
            <BrandOriginTable
              search={search}
              page={currentPage}
              setPagination={handleSetPagination}
            />
          </>
        );
      case "Number of Seats":
        return (
          <>
            <NumberOfSeatsTable
              search={search}
              page={currentPage}
              setPagination={handleSetPagination}
            />
          </>
        );
      case "Engine Types":
        return (
          <>
            <EngineTypesTable
              search={search}
              page={currentPage}
              setPagination={handleSetPagination}
            />
          </>
        );
      case "Engine Sizes":
        return (
          <>
            <EngineSizesTable
              search={search}
              page={currentPage}
              setPagination={handleSetPagination}
            />
          </>
        );
      case "Price From":
        return (
          <>
            <PriceFromTable
                page={currentPage}
                search={search}
                setPagination={handleSetPagination}
                countryId={selectedCountry}
              />
          </>
        );
      case "Models":
        return (
          <>
            <ModelTable
              page={currentPage}
              search={search}
              setPagination={handleSetPagination}
            />
          </>
        );
      case "Car Types":
        return (
          <CarTypesTable
            search={search}
            page={currentPage}
            setPagination={handleSetPagination}
          />
        );
      case "Categories":
        return (
          <CategoriesTable
            search={search}
            page={currentPage}
            setPagination={handleSetPagination}
          />
        );
      case "Price To":
        return (
          <PriceToTable
            search={search}
            page={currentPage}
            setPagination={handleSetPagination}
          />
        );
      default:
        return (
          <>
            <ModelTable
              page={currentPage}
              search={search}
              setPagination={handleSetPagination}
            />
          </>
        );
    }
  };

  return (
    <section>
      <ModelHeader
        selectedFilter={selectedTab}
        setSelectedFilter={handleTabChange}
        search={search}
        setSearch={setSearch}
        dateRange={dateRange}
        setDateRange={setDateRange}
        selectedCountry={selectedCountry}      
        setSelectedCountry={setSelectedCountry} 
      />
      <div className="px-2 md:px-8 relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTable()}
            {paginationMeta.totalItems > 0 && (
              <TablePagination
                currentPage={currentPage}
                setCurrentPage={handlePageChange}
                totalPages={paginationMeta.totalPages}
                totalItems={paginationMeta.totalItems}
                itemsPerPage={paginationMeta.itemsPerPage}
                from={paginationMeta.from}
                to={paginationMeta.to}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BrandsPage;
