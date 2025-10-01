import React, { useMemo } from "react";
import TabsFilter from "../general/dashboard/TabsFilter";
import { usePermissions } from "@/hooks/usePermissions";

interface SubordinatesHeaderProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const SettingTabs: React.FC<SubordinatesHeaderProps> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  const { hasPermission } = usePermissions();

  // Filter tabs based on user permissions
  const filtersData = useMemo(() => {
    const allFiltersData = [
      {
        titleAr: "اعدادات عامة",
        titleEn: "General Settings",
        permission: "view_general_setting",
      },
      {
        titleAr: "زر طلب تفاصيل سعر التأمين",
        titleEn: "Insurance Price Request Button",
        permission: "view_request_financing",
      },
      {
        titleAr: "الصفحات التعريفية",
        titleEn: "Informational Pages",
        permission: "view_info_page",
      },
      {
        titleAr: "الصور الاعلانية",
        titleEn: "Advertising Images",
        permission: "view_ad_image",
      },
      {
        titleAr: "الشروط والاحكام",
        titleEn: "Terms and Conditions",
        permission: "view_terms",
      },
      {
        titleAr: "روابط التواصل الاجتماعي",
        titleEn: "Social Media Links",
        permission: "edit_social_link", // No view_social_link in API, using edit
      },
      {
        titleAr: "مميزات التطبيق",
        titleEn: "App Features",
        permission: "view_app_feature",
      },
    ];

    return allFiltersData.filter((tab) => hasPermission(tab.permission));
  }, [hasPermission]);

  return (
    <div>
      <TabsFilter
        filters={filtersData}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </div>
  );
};

export default SettingTabs;
