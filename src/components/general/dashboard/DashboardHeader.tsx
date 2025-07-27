import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

interface DashboardHeaderProps {
  titleAr: string;
  titleEn: string;
  subtitleAr?: string;
  subtitleEn?: string;
  items: {
    titleAr: string;
    titleEn: string;
    link?: string;
  }[];
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  titleAr,
  titleEn,
  subtitleAr,
  subtitleEn,
  items,
}) => {
  const navigate = useNavigate();
  const {
    i18n: { language },
  } = useTranslation();

  const title = language === "ar" ? titleAr : titleEn;
  const subtitle = language === "ar" ? subtitleAr : subtitleEn;

  return (
    <div className="text-sm bg-white">
      <Breadcrumbs
        className="py-2 mb-1 border-b border-gray-200 px-9"
        itemClasses={{
          separator: "px-2",
        }}
        separator="/"
      >
        {items.map((item, index) => (
          <BreadcrumbItem key={index} href={item.link || "#"}>
            <span className={`${index === items.length - 1 ? "text-primary" : ""}`}>
              {language === "ar" ? item.titleAr : item.titleEn}
            </span>
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>

      <div className="flex items-start gap-3 py-4 px-9">
        <button
          onClick={() => navigate(-1)}
          className="p-3 border rounded-full bg-background"
        >
          {language === "ar" ? <ArrowRight /> : <ArrowLeft />}
        </button>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
