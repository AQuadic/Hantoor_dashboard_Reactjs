import SubordinatesHeader from "@/components/subordinates/SubordinatesHeader";
import { SubordinatesTable } from "@/components/subordinates/SubordinatesTable";
import { useState } from "react";

const SubordinatesPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("Subordinates");

  return (
    <section>
      <SubordinatesHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="px-2 md:px-8">
        <SubordinatesTable />
      </div>
    </section>
  );
};

export default SubordinatesPage;
