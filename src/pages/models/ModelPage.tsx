import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { usePermissions } from "@/hooks/usePermissions";

import TablePagination from "@/components/general/dashboard/table/TablePagination";
import Loading from "@/components/general/Loading";
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

const ModelPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    hasPermission,
    hasAnyPermission,
    isLoading: permsLoading,
  } = usePermissions();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const sectionParam = searchParams.get("section") || "Models";
  const pageParam = parseInt(searchParams.get("page") || "1");

  // Define permission mapping for each section
  const sectionPermissions = useMemo(
    () => ({
      Models: "view_vehicle_model",
      // Structure Types may be named vehicle_class or vehicle_body_type in permission sets
      "Structure Types": ["view_vehicle_class", "view_vehicle_body_type"],
      "Car Types": "view_vehicle_type",
      Categories: ["view_category", "view_vehicle_class"],
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
  const availableSections = useMemo(() => {
    return Object.keys(sectionPermissions).filter((section) => {
      const required =
        sectionPermissions[section as keyof typeof sectionPermissions];
      if (Array.isArray(required)) return hasAnyPermission(required);
      return hasPermission(required as string);
    });
  }, [sectionPermissions, hasPermission, hasAnyPermission]);

  // Compute initial selected section validated against permissions (mirrors SubordinatesPage logic)
  const initialSelected = (() => {
    // If URL requested section is available and user has permission, use it
    if (sectionParam && availableSections.includes(sectionParam))
      return sectionParam;
    // Otherwise fall back to first available section the user can access
    if (availableSections.length > 0) return availableSections[0];
    // Last resort: keep the URL value (it will be redirected later to 403)
    return sectionParam || "Models";
  })();

  // Check if user has access to the requested section
  const hasAccessToSection = useMemo(() => {
    const requiredPermission =
      sectionPermissions[sectionParam as keyof typeof sectionPermissions];
    if (!requiredPermission) return false;
    if (Array.isArray(requiredPermission))
      return hasAnyPermission(requiredPermission);
    return hasPermission(requiredPermission as string);
  }, [sectionParam, sectionPermissions, hasPermission, hasAnyPermission]);

  // Redirect logic for unauthorized access
  useEffect(() => {
    // Wait until permissions finish loading before deciding redirects.
    // If we act while permissions are loading we may incorrectly
    // consider availableSections empty and redirect to 403.
    if (permsLoading) return;

    if (!hasAccessToSection && availableSections.length > 0) {
      // User doesn't have access to current section, redirect to first available section
      const firstAvailableSection = availableSections[0];
      const newParams = new URLSearchParams(searchParams);
      newParams.set("section", firstAvailableSection);
      newParams.set("page", "1");
      setSearchParams(newParams, { replace: true });
      return;
    }

    if (availableSections.length === 0) {
      // User has no access to any section, redirect to 403
      navigate("/403", { replace: true });
    }
  }, [
    permsLoading,
    hasAccessToSection,
    availableSections,
    navigate,
    setSearchParams,
    searchParams,
  ]);

  const [selectedTab, setSelectedTab] = useState<string>(initialSelected);
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

  // Reset page to 1 when search term changes
  useEffect(() => {
    if (search) {
      setCurrentPage(1);
    }
  }, [search]);

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
  }, [sectionParam, setDateRange]);

  const handleSetPagination = useCallback((meta: typeof paginationMeta) => {
    setPaginationMeta(meta);
  }, []);

  const renderTable = () => {
    // If permissions are still loading, show a loading indicator so we don't
    // prematurely show Access Denied before the permission checks are ready.
    if (permsLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <Loading />
        </div>
      );
    }
    // Double-check permission before rendering. For sections that list multiple
    // permissions we consider the section accessible if the user has any of
    // the listed sub-permissions (OR logic). The permission utilities use
    // AND semantics for array inputs, so call hasAnyPermission explicitly.
    const requiredPermission =
      sectionPermissions[selectedTab as keyof typeof sectionPermissions];
    const hasAccess =
      requiredPermission === undefined
        ? false
        : Array.isArray(requiredPermission)
        ? hasAnyPermission(requiredPermission)
        : hasPermission(requiredPermission as string);

    if (!hasAccess) {
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
          <StructureTable
            search={search}
            page={currentPage}
            setPagination={handleSetPagination}
            dateParams={dateParams}
          />
        );
      case "Brand Origin":
        return (
          <BrandOriginTable
            search={search}
            page={currentPage}
            setPagination={handleSetPagination}
            dateParams={dateParams}
          />
        );
      case "Number of Seats":
        return (
          <NumberOfSeatsTable
            search={search}
            page={currentPage}
            setPagination={handleSetPagination}
            dateParams={dateParams}
          />
        );
      case "Engine Types":
        return (
          <EngineTypesTable
            search={search}
            page={currentPage}
            setPagination={handleSetPagination}
            dateParams={dateParams}
          />
        );
      case "Engine Sizes":
        return (
          <EngineSizesTable
            search={search}
            page={currentPage}
            setPagination={handleSetPagination}
            dateParams={dateParams}
          />
        );
      case "Price From":
        return (
          <PriceFromTable
            page={currentPage}
            search={search}
            setPagination={handleSetPagination}
            countryId={selectedCountry}
            dateParams={dateParams}
          />
        );
      case "Models":
        return (
          <ModelTable
            page={currentPage}
            search={search}
            setPagination={handleSetPagination}
            dateParams={dateParams}
          />
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
            countryId={selectedCountry}
            dateParams={dateParams}
          />
        );
      default:
        return null;
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
      {/* DEV debug panel removed - was interfering with real rendering */}
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

export default ModelPage;
