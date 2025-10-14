import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import TabsFilter from "@/components/general/dashboard/TabsFilter";
import React from "react";
import { Agent } from "@/api/agents/getAgentById";
import { useTranslation } from "react-i18next";

interface ViewAgentHeaderProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  agent?: Agent;
}

const ViewAgentHeader = ({
  selectedFilter,
  setSelectedFilter,
  agent,
}: ViewAgentHeaderProps) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const getAgentName = () => {
    if (!agent) return "...";
    return isArabic ? agent.name.ar : agent.name.en;
  };

  return (
    <div className="bg-white rounded-b-2xl">
      <DashboardHeader
        titleAr="تفاصيل الوكيل"
        titleEn="Agent details"
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/dashboard",
          },
          {
            titleAr: "السيارات",
            titleEn: "Cars",
            link: "/cars",
          },
          {
            titleAr: "تفاصيل الوكيل",
            titleEn: "Agent details",
            link: `/cars/agent/${agent?.id || ""}`,
          },
        ]}
      />
      <div className="bg-white px-9 mb-4 ">
        <div className="flex items-center gap-4">
          <img
            src="/images/AgentPlaceholder.png"
            alt="Agent Header"
            className="w-[56px] h-[56px] object-cover bg-white rounded-lg border-2 p-2"
          />
          <h3 className="text-xl">{getAgentName()}</h3>
        </div>
      </div>
      <TabsFilter
        filters={[
          {
            titleAr: "مراكز الصيانة",
            titleEn: "Maintenance Centers",
          },
          { titleAr: "معارض البيع", titleEn: "Showrooms" },
        ]}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </div>
  );
};

export default ViewAgentHeader;
