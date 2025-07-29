import TablePagination from "@/components/general/dashboard/table/TablePagination";
import React from "react";
import ModelHeader from "@/components/models/ModelHeader";
import { ModelTable } from "@/components/models/ModelTable";

const BrandsPage = () => {
  const [selectedFilter, setSelectedFilter] = React.useState("Models");
  const [currentModelsPage, setCurrentModelsPage] = React.useState(1);

  return (
    <section>
      <ModelHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="px-2 md:px-8">
        <ModelTable />
        <TablePagination
          currentPage={currentModelsPage}
          setCurrentPage={setCurrentModelsPage}
          totalPages={12}
          totalItems={50}
          itemsPerPage={10}
        />
      </div>
    </section>
  );
};

export default BrandsPage;
