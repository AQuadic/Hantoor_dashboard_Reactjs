import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import { RangeValue } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";

type ContactUsHeaderProps = {
  search: string;
  setSearch: (value: string) => void;
  dateRange?: RangeValue<CalendarDate> | null;
  setDateRange?: (range: RangeValue<CalendarDate> | null) => void;
};

const ContactUsHeader: React.FC<ContactUsHeaderProps> = ({
  search,
  setSearch,
  dateRange,
  setDateRange,
}) => {
  return (
    <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
      <DashboardHeader
        titleAr="تواصل معنا"
        titleEn="Contact us"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "تواصل معنا", titleEn: "Contact us" },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
        <div className="flex-1">
          <SearchBar
            termAr={search}
            termEn={search}
            placeholderAr="ابحث بالاسم"
            placeholderEn="Search by name"
            setTermAr={setSearch}
            setTermEn={setSearch}
          />
        </div>
        <div className="flex-1">
          <DashboardDatePicker value={dateRange} onChange={setDateRange} />
        </div>
      </div>
    </div>
  );
};

export default ContactUsHeader;
