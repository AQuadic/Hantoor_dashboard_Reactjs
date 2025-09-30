import React from "react";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardButton from "../general/dashboard/DashboardButton";
import { useHasPermission } from "@/hooks/usePermissions";
import { Link } from "react-router";
import { RangeValue } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";

type FAQsHeaderProps = {
  search: string;
  setSearch: (value: string) => void;
  dateRange?: RangeValue<CalendarDate> | null;
  setDateRange?: (range: RangeValue<CalendarDate> | null) => void;
};

const FAQsHeader: React.FC<FAQsHeaderProps> = ({
  search,
  setSearch,
  dateRange,
  setDateRange,
}) => {
  const canCreate = useHasPermission("create_faq");

  return (
    <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
      <DashboardHeader
        titleAr="الاسئلة الشائعة"
        titleEn="Frequently asked questions"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "الاسئلة الشائعة", titleEn: "Frequently asked questions" },
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
        {canCreate && (
          <Link to="/faq/add">
            <DashboardButton
              titleAr={"اضافة سؤال جديد"}
              titleEn={"Add a new question"}
              variant="add"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default FAQsHeader;
