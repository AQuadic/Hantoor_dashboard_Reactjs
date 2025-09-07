import React from "react";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardButton from "../general/dashboard/DashboardButton";
import ChangeLanguage from "../general/ChangeLanguage";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

interface NotificationsHeaderProps {
  onSearch: (term: string) => void;
}

const NotificationsHeader: React.FC<NotificationsHeaderProps> = ({
  onSearch,
}) => {
  const { t } = useTranslation("notifications");

  const handleSearch = (value: string) => {
    onSearch(value);
  };

  return (
    <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
      <DashboardHeader
        titleAr="الاشعارات"
        titleEn="Notifications"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "الاشعارات", titleEn: "Notifications" },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
        <div className="flex-1">
          <SearchBar
            termAr={""}
            termEn={""}
            placeholder={t("searchByName")}
            setTermAr={handleSearch}
            setTermEn={handleSearch}
          />
        </div>
        <div className="flex-1">
          <DashboardDatePicker />
        </div>
        <Link to="/notifications/add">
          <DashboardButton
            titleAr={"اضافة اشعار جديد"}
            titleEn={"Add a new notification"}
            variant="add"
          />
        </Link>
        <ChangeLanguage />
      </div>
    </div>
  );
};

export default NotificationsHeader;
