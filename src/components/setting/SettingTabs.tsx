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
  const { hasAnyPermission } = usePermissions();

  // Filter tabs based on user permissions - user needs ANY of the related permissions
  // Note: Many sections don't have view_ permissions in API, only CRUD operations
  const filtersData = useMemo(() => {
    const allFiltersData = [
      {
        titleAr: "اعدادات عامة",
        titleEn: "General Settings",
        permissions: ["edit_general_setting"],
      },
      {
        titleAr: "زر طلب تفاصيل سعر التأمين",
        titleEn: "Insurance Price Request Button",
        permissions: [
          // No view_request_financing in API
          "create_request_financing",
          "edit_request_financing",
          "delete_request_financing",
          "change-status_request_financing",
        ],
      },
      {
        titleAr: "الصفحات التعريفية",
        titleEn: "Onboarding Pages",
        permissions: [
          // No view_onboarding in API
          "create_onboarding",
          "edit_onboarding",
          "delete_onboarding",
        ],
      },
      {
        titleAr: "الصور الاعلانية",
        titleEn: "Advertising Images",
        permissions: [
          // No view_ad_image in API
          "create_ad_image",
          "delete_ad_image",
        ],
      },
      {
        titleAr: "الشروط والاحكام",
        titleEn: "Terms and Conditions",
        permissions: [
          // No view_terms in API
          "create_terms",
          "edit_terms",
          "delete_terms",
        ],
      },
      {
        titleAr: "روابط التواصل الاجتماعي",
        titleEn: "Social Media Links",
        permissions: ["edit_social_link"],
      },
      {
        titleAr: "مميزات التطبيق",
        titleEn: "App Features",
        permissions: [
          // No view_app_feature in API
          "create_app_feature",
          "edit_app_feature",
          "delete_app_feature",
          "change-status_app_feature",
        ],
      },
    ];

    return allFiltersData.filter((tab) => hasAnyPermission(tab.permissions));
  }, [hasAnyPermission]);

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
