import React from "react";
import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import ChangeLanguage from "../general/ChangeLanguage";
import SearchBar from "../general/dashboard/SearchBar";
import TabsFilter from "../general/dashboard/TabsFilter";
import { useTranslation } from "react-i18next";

interface SubordinatesHeaderProps {
  selectedFilter: "Subordinates" | "Permissions";
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<"Subordinates" | "Permissions">
  >;
  setTermAr: React.Dispatch<React.SetStateAction<string>>;
  setTermEn: React.Dispatch<React.SetStateAction<string>>;
}

const SubordinatesHeader: React.FC<SubordinatesHeaderProps> = ({
  selectedFilter,
  setSelectedFilter,
  setTermAr,
  setTermEn,
}) => {
  const { t } = useTranslation("subordinates");
  return (
    <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
      <DashboardHeader
        titleAr="المسؤولين الفرعيين"
        titleEn="Subordinates"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "المسؤولين الفرعيين", titleEn: "Subordinates" },
        ]}
      />

      <TabsFilter
        filters={[
          {
            titleAr: "المسؤولين الفرعيين",
            titleEn: "Subordinates",
          },
          {
            titleAr: " الصلاحيات",
            titleEn: "Permissions",
          },
        ]}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
        <div className="flex-1">
          <SearchBar
            termAr={""}
            termEn={""}
            placeholder={t("searchBy")}
            setTermAr={setTermAr}
            setTermEn={setTermEn}
          />
        </div>
        <div className="flex-1">
          <DashboardDatePicker />
        </div>
        {selectedFilter === "Subordinates" ? (
          <Link to="/subordinates/add">
            <DashboardButton
              titleEn={"Add a new Subordinate"}
              titleAr={"اضافة مسؤول فرعي جديد"}
              variant="add"
            />
          </Link>
        ) : (
          <Link to="/subordinates/permissions/add">
            <DashboardButton
              titleEn={"Add new permission"}
              titleAr={"اضافة صلاحية جديدة "}
              variant="add"
            />
          </Link>
        )}
        <ChangeLanguage />
      </div>
    </div>
  );
};

export default SubordinatesHeader;
