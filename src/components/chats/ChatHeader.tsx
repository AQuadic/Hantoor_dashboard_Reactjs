import React from "react";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import { RangeValue } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";

interface ChatHeaderProps {
  setSearchTerm?: (term: string) => void;
  searchTerm?: string;
  dateRange?: RangeValue<CalendarDate> | null;
  setDateRange?: (range: RangeValue<CalendarDate> | null) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  setSearchTerm,
  searchTerm,
  dateRange,
  setDateRange,
}) => {
  return (
    <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
      <DashboardHeader
        titleAr="المحادثات"
        titleEn="Chats"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "المحادثات", titleEn: "Chats" },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
        <div className="flex-1">
          <SearchBar
            termAr={searchTerm || ""}
            termEn={searchTerm || ""}
            setTermAr={setSearchTerm || (() => {})}
            setTermEn={setSearchTerm || (() => {})}
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

export default ChatHeader;
