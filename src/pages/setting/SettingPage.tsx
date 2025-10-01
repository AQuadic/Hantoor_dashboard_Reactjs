import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";
import SettingHeader from "@/components/setting/SettingHeader";
import SettingTabs from "@/components/setting/SettingTabs";
import GeneralSettings from "@/components/setting/GeneralSettings";
import InsurancePage from "./InsurancePage";
import ProfileSetting from "./ProfileSetting";
import AdvertisingImages from "@/components/setting/advertisingimages/AdvertisingImages";
import TermsAndConditions from "./TermsAndConditions";
import SocialMediaPage from "../socialmedia/SocialMediaPage";
import FeaturesPage from "../features/FeaturesPage";

const SettingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  const sectionParam = searchParams.get("section") || "General Settings";

  // Define permission mapping for each section
  const sectionPermissions = useMemo(
    () => ({
      "General Settings": "view_general_setting",
      "Insurance Price Request Button": "view_request_financing",
      "Informational Pages": "view_info_page",
      "Advertising Images": "view_ad_image",
      "Terms and Conditions": "view_terms",
      "Social Media Links": "edit_social_link", // No view permission available
      "App Features": "view_app_feature",
    }),
    []
  );

  // Get available sections based on user permissions
  const availableSections = useMemo(
    () =>
      Object.keys(sectionPermissions).filter((section) =>
        hasPermission(
          sectionPermissions[section as keyof typeof sectionPermissions]
        )
      ),
    [sectionPermissions, hasPermission]
  );

  // Check if user has access to the requested section
  const hasAccessToSection = useMemo(() => {
    const requiredPermission =
      sectionPermissions[sectionParam as keyof typeof sectionPermissions];
    return requiredPermission ? hasPermission(requiredPermission) : false;
  }, [sectionParam, sectionPermissions, hasPermission]);

  // Redirect logic for unauthorized access
  useEffect(() => {
    if (!hasAccessToSection && availableSections.length > 0) {
      // User doesn't have access to current section, redirect to first available section
      const firstAvailableSection = availableSections[0];
      const newParams = new URLSearchParams(searchParams);
      newParams.set("section", firstAvailableSection);
      setSearchParams(newParams, { replace: true });
    }

    if (availableSections.length === 0) {
      // User has no access to any section, redirect to 403
      navigate("/403", { replace: true });
    }
  }, [
    hasAccessToSection,
    availableSections,
    navigate,
    setSearchParams,
    searchParams,
  ]);

  const [selectedFilter, setSelectedFilter] = useState(sectionParam);

  const handleFilterChange = useCallback(
    (value: React.SetStateAction<string>) => {
      const newFilter =
        typeof value === "function" ? value(selectedFilter) : value;
      setSelectedFilter(newFilter);

      // Update URL when user changes tab
      const newParams = new URLSearchParams(searchParams);
      newParams.set("section", newFilter);
      setSearchParams(newParams, { replace: true });
    },
    [selectedFilter, searchParams, setSearchParams]
  );

  // Update selected filter when URL changes
  useEffect(() => {
    if (sectionParam !== selectedFilter && hasAccessToSection) {
      setSelectedFilter(sectionParam);
    }
  }, [sectionParam, selectedFilter, hasAccessToSection]);

  const renderSection = () => {
    // Double-check permission before rendering
    const requiredPermission =
      sectionPermissions[selectedFilter as keyof typeof sectionPermissions];
    if (!requiredPermission || !hasPermission(requiredPermission)) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Access Denied
            </h3>
            <p className="text-gray-600">
              You don't have permission to access this section.
            </p>
          </div>
        </div>
      );
    }

    switch (selectedFilter) {
      case "General Settings":
        return <GeneralSettings />;
      case "Insurance Price Request Button":
        return <InsurancePage />;
      case "Informational Pages":
        return <ProfileSetting />;
      case "Advertising Images":
        return <AdvertisingImages />;
      case "Terms and Conditions":
        return <TermsAndConditions />;
      case "Social Media Links":
        return <SocialMediaPage />;
      case "App Features":
        return <FeaturesPage />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div>
      <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
        <SettingHeader />
        <SettingTabs
          selectedFilter={selectedFilter}
          setSelectedFilter={handleFilterChange}
        />
      </div>

      <div className="mt-4">{renderSection()}</div>
    </div>
  );
};

export default SettingPage;
