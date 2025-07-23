import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import React from "react";
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
  return (
    <div className="text-sm bg-white rounded-b-2xl shadow-sm">
      <Breadcrumbs
        className="my-2 border-b border-gray-200 pb-2 px-9"
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
        <span className="rounded-full p-3 border">
          <ArrowLeft color="#5A5A5A" />
        </span>
        <h1 className="text-2xl font-bold">{title}</h1>
      </button>
    </div>
  );
};

export default DashboardHeader;
