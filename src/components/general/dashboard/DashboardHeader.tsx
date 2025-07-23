import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

interface DashboardHeaderProps {
  title: string;
  items: {
    title: string;
    link?: string;
  }[];
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, items }) => {
  const navigate = useNavigate();
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <div className="text-sm bg-white ">
      <Breadcrumbs
        className="mb-1 border-b border-gray-200 pb-2 px-9"
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
              {item.title}
            </span>
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
      <button
        onClick={() => navigate(-1)}
        className="px-9 flex items-center gap-3 pb-4"
      >
        <span className="rounded-full p-3 border bg-background">
          {language === "ar" ? (
            <ArrowRight className="rotate-180" />
          ) : (
            <ArrowLeft className="rotate-180" />
          )}
        </span>
        <h1 className="text-2xl font-bold">{title}</h1>
      </button>
    </div>
  );
};

export default DashboardHeader;
