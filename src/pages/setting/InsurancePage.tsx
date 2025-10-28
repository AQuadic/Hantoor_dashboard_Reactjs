import React, { useState } from "react";
import InsuranceHeader from "@/components/setting/insuranceprice/InsuranceHeader";
import InsuranceTable from "@/components/setting/insuranceprice/InsuranceTable";

const InsurancePage = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm] = useState("");

  return (
    <div className="px-2 md:px-8">
      <InsuranceHeader
        searchTerm={searchTerm}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <InsuranceTable selectedCountry={selectedCountry} />
    </div>
  );
};

export default InsurancePage;
