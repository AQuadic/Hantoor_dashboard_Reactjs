import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { usePermissions } from "@/hooks/usePermissions";

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
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const [selectedCountry] = useState<string | null>(null);

  const sectionParam = searchParams.get("section") || "Models";
  const pageParam = parseInt(searchParams.get("page") || "1");

  // Define permission mapping for each section
  const sectionPermissions = useMemo(
    () => ({
      Models: "view_vehicle_model",
      "Structure Types": "view_vehicle_class",
      "Car Types": "view_vehicle_type",
      Categories: "view_category",
      "Brand Origin": "view_brand_origin",
      "Number of Seats": "view_seat_count",
      "Engine Types": "view_engine_type",
      "Engine Sizes": "view_engine_size",
      "Price From": "view_price_from",
      "Price To": "view_price_to",
    }),
    []
  );

  // Get available sections based on user permissions
  const availableSections = useMemo(
    () =>
      Object.keys(sectionPermissions).filter((section) =>
        hasPermission(
          sectionPermissions[section as keyof typeof sectionPermissions]
        )
      ),
    [sectionPermissions, hasPermission]
  );

  // Check if user has access to the requested section
  const hasAccessToSection = useMemo(() => {
    const requiredPermission =
      sectionPermissions[sectionParam as keyof typeof sectionPermissions];
    return requiredPermission ? hasPermission(requiredPermission) : false;
  }, [sectionParam, sectionPermissions, hasPermission]);

  // Redirect logic for unauthorized access
  useEffect(() => {
    if (!hasAccessToSection && availableSections.length > 0) {
      // User doesn't have access to current section, redirect to first available section
      const firstAvailableSection = availableSections[0];
      const newParams = new URLSearchParams(searchParams);
      newParams.set("section", firstAvailableSection);
      newParams.set("page", "1");
      setSearchParams(newParams, { replace: true });
    }

    if (availableSections.length === 0) {
      // User has no access to any section, redirect to 403
      navigate("/403", { replace: true });
    }
  }, [
    hasAccessToSection,
    availableSections,
    navigate,
    setSearchParams,
    searchParams,
  ]);

  const [selectedTab, setSelectedTab] = useState(sectionParam);
  const [currentPage, setCurrentPage] = useState(pageParam);



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

  const handleTabChange = useCallback(
  (value: React.SetStateAction<string>) => {
    const newTab = typeof value === "function" ? value(selectedTab) : value;
    setSelectedTab(newTab);
    setCurrentPage(1);
    setSearch("");
    setDateRange(null);

    const newParams = new URLSearchParams(searchParams);
    newParams.set("section", newTab);
    newParams.set("page", "1");
    newParams.delete("dateFrom");
    newParams.delete("dateTo");

    setSearchParams(newParams, { replace: true });
    },
    [selectedTab, searchParams, setSearchParams, setDateRange]
  );
  useEffect(() => {
    setDateRange(null);
  }, [sectionParam]);

  const handleSetPagination = useCallback((meta: typeof paginationMeta) => {
    setPaginationMeta(meta);
  }, []);

  const renderTable = () => {
    // Double-check permission before rendering
    const requiredPermission =
      sectionPermissions[selectedTab as keyof typeof sectionPermissions];
    if (!requiredPermission || !hasPermission(requiredPermission)) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Access Denied
            </h3>
            <p className="text-gray-600">
              You don't have permission to access this section.
            </p>
          </div>
        </div>
      );
    }

    switch (selectedTab) {
      case "Structure Types":
        return (
          <>
            <StructureTable
              search={search}
              page={currentPage}
              setPagination={handleSetPagination}
              dateParams={dateParams}
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
              dateParams={dateParams}
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
              dateParams={dateParams}
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
              dateParams={dateParams}
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
              dateParams={dateParams}
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
              dateParams={dateParams}
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
              dateParams={dateParams}
            />
          </>
        );
      case "Car Types":
        return (
          <CarTypesTable
            search={search}
            page={currentPage}
            setPagination={handleSetPagination}
            dateParams={dateParams}
          />
        );
      case "Categories":
        return (
          <CategoriesTable
            search={search}
            page={currentPage}
            setPagination={handleSetPagination}
            dateParams={dateParams}
          />
        );
      case "Price To":
        return (
          <PriceToTable
            search={search}
            page={currentPage}
            setPagination={handleSetPagination}
            dateParams={dateParams}
          />
        );
      default:
        return (
          <>
            <ModelTable
              page={currentPage}
              search={search}
              setPagination={handleSetPagination}
              dateParams={dateParams}
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
