import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

interface DashboardHeaderProps {
  titleAr: string;
  titleEn: string;
  items: {
    titleAr: string;
    titleEn: string;
    link?: string;
  }[];
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  titleAr,
  titleEn,
  items,
}) => {
  const navigate = useNavigate();
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <div className="text-sm bg-white ">
      <Breadcrumbs
        className="py-2 mb-1 border-b border-gray-200 px-9"
        itemClasses={{
          separator: "px-2",
        }}
        separator="/"
      >
        {items.map((item, index) => (
          <BreadcrumbItem key={index} href={item.link || "#"}>
            <span
              className={` ${index === items.length - 1 ? "text-primary" : ""}`}
            >
              {language === "ar" ? item.titleAr : item.titleEn}
            </span>
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 py-4 px-9"
      >
        <span className="p-3 border rounded-full bg-background">
          {language === "ar" ? <ArrowRight /> : <ArrowLeft />}
        </span>
        <h1 className="text-2xl font-bold">
          {language === "ar" ? titleAr : titleEn}
        </h1>
      </button>
    </div>
  );
};

export default DashboardHeader;
