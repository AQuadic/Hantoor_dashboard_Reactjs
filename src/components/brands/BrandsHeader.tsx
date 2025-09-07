import React from "react";
import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";

interface BrandsHeaderProps {
  termAr: string;
  termEn: string;
  setTermAr: (value: string) => void;
  setTermEn: (value: string) => void;
}

const BrandsHeader: React.FC<BrandsHeaderProps> = ({
  termAr,
  termEn,
  setTermAr,
  setTermEn,
}) => {
  return (
    <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
      <DashboardHeader
        titleAr="الماركات"
        titleEn="Brands"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "الماركات", titleEn: "Brands" },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
        <div className="flex-1">
          <SearchBar
            termAr={termAr}
            termEn={termEn}
            setTermAr={setTermAr}
            setTermEn={setTermEn}
            placeholderAr="ابحث بالاسم"
            placeholderEn="Search by name"
          />
        </div>
        <div className="flex-1">
          <DashboardDatePicker />
        </div>
        <Link to="/brands/add">
          <DashboardButton
            titleAr={"اضافة ماركة جديدة"}
            titleEn={"Add new brand"}
            variant="add"
          />
        </Link>
      </div>
    </div>
  );
};

export default BrandsHeader;
