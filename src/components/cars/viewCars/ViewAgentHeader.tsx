import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import TabsFilter from "@/components/general/dashboard/TabsFilter";
import React from "react";

interface ViewAgentHeaderProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const ViewAgentHeader = ({
  selectedFilter,
  setSelectedFilter,
}: ViewAgentHeaderProps) => {
  return (
    <div className="bg-white">
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
            link: "/dashboard/cars/view-cars",
          },
          {
            titleAr: "تفاصيل الوكيل",
            titleEn: "Agent details",
            link: "/dashboard/cars/view-agent",
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
          <h3 className="text-xl">الشركة الدولية التجارية</h3>
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
