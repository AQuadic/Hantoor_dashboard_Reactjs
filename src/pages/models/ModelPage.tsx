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

/*
*     {
      titleAr: "الموديلات",
      titleEn: "Models",
      addText: "اضافة موديل جديد",
      link: "/models/add",
    },
    {
      titleAr: "انواع الهيكل",
      titleEn: "Structure Types",
      addText: "اضافة نوع هيكل جديد",
      link: "/structure-types/add",
    },
    {
      titleAr: "انواع السيارة",
      titleEn: "Car Types",
      addText: "اضافة نوع سيارة جديد",
      link: "/car-types/add",
    },
    {
      titleAr: "الفئات",
      titleEn: "Categories",
      addText: "اضافة فئة جديدة",
      link: "/categories/add",
    },
    {
      titleAr: "منشأ الماركة",
      titleEn: "Brand Origin",
      addText: "اضافة منشأ ماركة جديد",
      link: "/brand-origins/add",
    },
    {
      titleAr: "عدد المقاعد",
      titleEn: "Number of Seats",
      addText: "اضافة عدد مقاعد جديد",
      link: "/seat-numbers/add",
    },
    {
      titleAr: "انواع الماكينة",
      titleEn: "Engine Types",
      addText: "اضافة نوع ماكينة جديد",
      link: "/engine-types/add",
    },
    {
      titleAr: "احجام الماكينة",
      titleEn: "Engine Sizes",
      addText: "اضافة حجم ماكينة جديد",
      link: "/engine-sizes/add",
    },
    {
      titleAr: "السعر من",
      titleEn: "Price From",
      addText: "اضافة سعر من جديد",
      link: "/price-from/add",
    },
    {
      titleAr: "السعر الى",
      titleEn: "Price To",
      addText: "اضافة سعر الى جديد",
      link: "/price-to/add",
    },
  ];
* **/

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
        {selectedFilter === "Models" && <ModelTable />}
        {selectedFilter === "Structure Types" && <StructureTable />}
        {selectedFilter === "Car Types" && <CarTypesTable />}
        {selectedFilter === "Categories" && <CategoriesTable />}
        {selectedFilter === "Brand Origin" && <BrandOriginTable />}
        {selectedFilter === "Number of Seats" && <NumberOfSeatsTable />}
        {selectedFilter === "Engine Types" && <EngineTypesTable />}
        {selectedFilter === "Engine Sizes" && <EngineSizesTable />}
        {selectedFilter === "Price From" && <PriceFromTable />}
        {selectedFilter === "Price To" && <PriceToTable />}

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
