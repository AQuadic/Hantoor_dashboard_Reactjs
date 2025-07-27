import TablePagination from "@/components/general/dashboard/table/TablePagination";
import { PermissionsTable } from "@/components/subordinates/PermissionsTable";
import SubordinatesHeader from "@/components/subordinates/SubordinatesHeader";
import { SubordinatesTable } from "@/components/subordinates/SubordinatesTable";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const SubordinatesPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("Subordinates");

  return (
    <section>
      <SubordinatesHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="px-2 md:px-8 relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {selectedFilter === "Subordinates" ? (
            <motion.div
              key="subordinates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SubordinatesTable />
              <TablePagination
                currentPage={1}
                setCurrentPage={() => {}}
                totalPages={5}
                totalItems={100}
                itemsPerPage={20}
              />
            </motion.div>
          ) : (
            <motion.div
              key="permissions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PermissionsTable />
              <TablePagination
                currentPage={1}
                setCurrentPage={() => {}}
                totalPages={5}
                totalItems={100}
                itemsPerPage={20}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SubordinatesPage;
