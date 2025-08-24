import React from "react";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import { useTranslation } from "react-i18next";

interface ChatHeaderProps {
  setSearchTerm?: (term: string) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ setSearchTerm }) => {
  const { t } = useTranslation("chats");

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
            termAr=""
            termEn=""
            setTermAr={setSearchTerm || (() => {})}
            setTermEn={setSearchTerm || (() => {})}
            placeholder={t("searchByName") || "Search by name"}
          />
        </div>
        <div className="flex-1">
          <DashboardDatePicker />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
