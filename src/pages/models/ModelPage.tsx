import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import TablePagination from "@/components/general/dashboard/table/TablePagination";
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
import { DebouncedSearchInput } from "@/components/general/DebouncedSearchInput";

const BrandsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sectionParam = searchParams.get("section") || "Models";
  const pageParam = parseInt(searchParams.get("page") || "1");

  const [selectedTab, setSelectedTab] = useState(sectionParam);
  const [currentPage, setCurrentPage] = useState(pageParam);

  useEffect(() => {
    setSearchParams({ section: selectedTab, page: currentPage.toString() });
  }, [selectedTab, currentPage, setSearchParams]);

  const [search, setSearch] = useState("");

  const renderTable = () => {
    switch (selectedTab) {
      case "Brand Origin":
        return (
          <>
            <DebouncedSearchInput
              placeholder="Search Brand Origin..."
              onSearch={setSearch}
            />
            <BrandOriginTable search={search} />
          </>
        );
      case "Number of Seats":
        return (
          <>
            <DebouncedSearchInput
              placeholder="Search Number of Seats..."
              onSearch={setSearch}
            />
            <NumberOfSeatsTable search={search} />
          </>
        );
      case "Engine Types":
        return (
          <>
            <DebouncedSearchInput
              placeholder="Search Engine Types..."
              onSearch={setSearch}
            />
            <EngineTypesTable search={search} />
          </>
        );
      case "Engine Sizes":
        return (
          <>
            <DebouncedSearchInput
              placeholder="Search Engine Sizes..."
              onSearch={setSearch}
            />
            <EngineSizesTable search={search} />
          </>
        );
      case "Price From":
        return (
          <>
            <DebouncedSearchInput
              placeholder="Search Price From..."
              onSearch={setSearch}
            />
            <PriceFromTable search={search} />
          </>
        );
      case "Models":
        return <ModelTable />;
      case "Structure Types":
        return <StructureTable />;
      case "Car Types":
        return <CarTypesTable />;
      case "Categories":
        return <CategoriesTable />;
      case "Price To":
        return <PriceToTable />;
      default:
        return <ModelTable />;
    }
  };

  return (
    <section>
      <ModelHeader
        selectedFilter={selectedTab}
        setSelectedFilter={setSelectedTab}
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
            <TablePagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={12}
              totalItems={50}
              itemsPerPage={10}
              from={1}
              to={10}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BrandsPage;
