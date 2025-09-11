import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import { useState } from "react";
import { RangeValue } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";

interface FinancingHeaderProps {
  onSearch: (term: string) => void;
  dateRange?: RangeValue<CalendarDate> | null;
  setDateRange?: (range: RangeValue<CalendarDate> | null) => void;
}

const FinancingHeader = ({
  onSearch,
  dateRange,
  setDateRange,
}: FinancingHeaderProps) => {
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
          <DashboardDatePicker value={dateRange} onChange={setDateRange} />
        </div>
      </div>
    </div>
  );
};

export default FinancingHeader;
