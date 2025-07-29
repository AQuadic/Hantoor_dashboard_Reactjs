import React from "react";
import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import TabsFilter from "../general/dashboard/TabsFilter";

interface SubordinatesHeaderProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const SubordinatesHeader: React.FC<SubordinatesHeaderProps> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  return (
    <div className="pt-2 pb-6 bg-white ">
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
          <SearchBar term={"ابحث بالاسم, رقم الجوال, البريد الالكتروني"} setTerm={() => {}} />
        </div>
        <div className="flex-1">
          <DashboardDatePicker />
        </div>
        {selectedFilter === "Subordinates" ? (
          <Link to="/subordinates/add">
            <DashboardButton title={"اضافة مسؤول فرعي جديد"} variant="add" />
          </Link>
        ) : (
          <Link to="/subordinates/permissions/add">
            <DashboardButton title={"اضافة صلاحية جديدة "} variant="add" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SubordinatesHeader;
