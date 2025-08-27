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
  const [paginationMeta, setPaginationMeta] = useState({
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    from: 0,
    to: 0,
  });

  const renderTable = () => {
    switch (selectedTab) {
      case "Structure Types":
        return (
          <>
            <StructureTable
              search={search}
              page={currentPage}
              setPagination={(m) => setPaginationMeta(m)}
            />
          </>
        );
      case "Brand Origin":
        return (
          <>
            <BrandOriginTable
              search={search}
              page={currentPage}
              setPagination={(m) => setPaginationMeta(m)}
            />
          </>
        );
      case "Number of Seats":
        return (
          <>
            <NumberOfSeatsTable
              search={search}
              page={currentPage}
              setPagination={(m) => setPaginationMeta(m)}
            />
          </>
        );
      case "Engine Types":
        return (
          <>
            <EngineTypesTable
              search={search}
              page={currentPage}
              setPagination={(m) => setPaginationMeta(m)}
            />
          </>
        );
      case "Engine Sizes":
        return (
          <>
            <EngineSizesTable
              search={search}
              page={currentPage}
              setPagination={(m) => setPaginationMeta(m)}
            />
          </>
        );
      case "Price From":
        return (
          <>
            <PriceFromTable search={search} />
          </>
        );
      case "Models":
        return (
          <>
            <ModelTable
              page={currentPage}
              search={search}
              setPagination={(m) => setPaginationMeta(m)}
            />
          </>
        );
      case "Car Types":
        return (
          <CarTypesTable 
            search={search}
            page={currentPage}
            setPagination={(m) => setPaginationMeta(m)}
          />
        );
      case "Categories":
        return (
          <CategoriesTable 
            search={search}
            page={currentPage}
            setPagination={(m) => setPaginationMeta(m)}
          />
        );
      case "Price To":
        return <PriceToTable />;
      default:
        return (
          <>
            <ModelTable
              page={currentPage}
              search={search}
              setPagination={setPaginationMeta}
            />
          </>
        );
    }
  };

  return (
    <section>
      <ModelHeader
        selectedFilter={selectedTab}
        setSelectedFilter={setSelectedTab}
        search={search}
        setSearch={setSearch}
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
                setCurrentPage={setCurrentPage}
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
