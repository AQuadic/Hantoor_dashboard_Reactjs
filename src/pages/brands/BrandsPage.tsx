import BrandsHeader from "@/components/brands/BrandsHeader";
import { BrandsTable } from "@/components/brands/BrandsTable";
import React from "react";

const BrandsPage = () => {
  return (
    <section>
      <BrandsHeader />
      <div className="px-2 md:px-8">
        <BrandsTable />
      </div>
    </section>
  );
};

export default BrandsPage;
