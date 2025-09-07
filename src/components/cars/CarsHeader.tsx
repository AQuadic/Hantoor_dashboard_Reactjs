import React from "react";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import ChangeLanguage from "../general/ChangeLanguage";
import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import CarsSelect from "./CarsSelect";

interface CarsHeaderProps {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
}

const CarsHeader = ({ searchTerm, setSearchTerm }: CarsHeaderProps) => {
  return (
    <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
      <DashboardHeader
        titleAr="السيارات"
        titleEn="Cars"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "السيارات", titleEn: "Cars" },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
        <div className="flex-1">
          <SearchBar
            termAr={searchTerm || ""}
            termEn={searchTerm || ""}
            setTermAr={setSearchTerm || (() => {})}
            setTermEn={setSearchTerm || (() => {})}
            placeholder="ابحث باسم السيارة / اسم الوكيل"
          />
        </div>
        <div className="flex-1">
          <DashboardDatePicker />
        </div>
        <Link to="/cars/add">
          <DashboardButton
            titleAr={"اضافة سيارة جديدة"}
            titleEn={"Add a new car"}
            variant="add"
          />
        </Link>
        <ChangeLanguage />
      </div>
      <CarsSelect />
    </div>
  );
};

export default CarsHeader;
