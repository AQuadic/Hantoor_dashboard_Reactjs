import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React from "react";
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
import { AnimatePresence, motion } from "framer-motion";

const BrandsPage = () => {
  const [selectedFilter, setSelectedFilter] = React.useState("Models");
  const [currentModelsPage, setCurrentModelsPage] = React.useState(1);

  const renderTable = () => {
    switch (selectedFilter) {
      case "Models":
        return <ModelTable />;
      case "Structure Types":
        return <StructureTable />;
      case "Car Types":
        return <CarTypesTable />;
      case "Categories":
        return <CategoriesTable />;
      case "Brand Origin":
        return <BrandOriginTable />;
      case "Number of Seats":
        return <NumberOfSeatsTable />;
      case "Engine Types":
        return <EngineTypesTable />;
      case "Engine Sizes":
        return <EngineSizesTable />;
      case "Price From":
        return <PriceFromTable />;
      case "Price To":
        return <PriceToTable />;
      default:
        return <ModelTable />;
    }
  };

  return (
    <section>
      <ModelHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="px-2 md:px-8 relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTable()}
            <TablePagination
              currentPage={currentModelsPage}
              setCurrentPage={setCurrentModelsPage}
              totalPages={12}
              totalItems={50}
              itemsPerPage={10}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BrandsPage;
