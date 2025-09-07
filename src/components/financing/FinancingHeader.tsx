import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import { useState } from "react";

interface FinancingHeaderProps {
  onSearch: (term: string) => void;
}

const FinancingHeader = ({ onSearch }: FinancingHeaderProps) => {
  const [searchTermAr, setSearchTermAr] = useState("");
  const [searchTermEn, setSearchTermEn] = useState("");

  const handleSearchChangeAr = (term: string) => {
    setSearchTermAr(term);
    onSearch(term);
  };

  const handleSearchChangeEn = (term: string) => {
    setSearchTermEn(term);
    onSearch(term);
  };

  return (
    <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
      <DashboardHeader
        titleAr="التمويل"
        titleEn="Financing"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "التمويل", titleEn: "Financing" },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
        <div className="flex-1">
          <SearchBar
            termAr={searchTermAr}
            termEn={searchTermEn}
            setTermAr={handleSearchChangeAr}
            setTermEn={handleSearchChangeEn}
            placeholderAr="ابحث بالاسم"
            placeholderEn="Search by name"
          />
        </div>
        <div className="flex-1">
          <DashboardDatePicker />
        </div>
      </div>
    </div>
  );
};

export default FinancingHeader;
