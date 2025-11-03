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
  const { hasAnyPermission } = usePermissions();

  const sectionParam = searchParams.get("section") || "General Settings";

  // Define permission mapping for each section - user needs ANY of these permissions
  // Note: Many sections don't have view_ permissions in API, only CRUD operations
  const sectionPermissions = useMemo(
    () => ({
      "General Settings": ["edit_general_setting"],
      "Insurance Price Request Button": [
        // No view_request_financing in API
        "create_request_financing",
        "edit_request_financing",
        "delete_request_financing",
        "change-status_request_financing",
      ],
      "Onboarding Pages": [
        // No view_onboarding in API
        "create_onboarding",
        "edit_onboarding",
        "delete_onboarding",
      ],
      "Advertising Images": [
        // No view_ad_image in API
        "create_ad_image",
        "delete_ad_image",
      ],
      "Terms and Conditions": [
        // No view_terms in API
        "create_terms",
        "edit_terms",
        "delete_terms",
      ],
      "Social Media Links": ["edit_social_link"],
      "App Features": [
        // No view_app_feature in API
        "create_app_feature",
        "edit_app_feature",
        "delete_app_feature",
        "change-status_app_feature",
      ],
    }),
    []
  );

  // Get available sections based on user permissions
  const availableSections = useMemo(
    () =>
      Object.keys(sectionPermissions).filter((section) => {
        const permissions =
          sectionPermissions[section as keyof typeof sectionPermissions];
        return hasAnyPermission(permissions);
      }),
    [sectionPermissions, hasAnyPermission]
  );

  // Check if user has access to the requested section
  const hasAccessToSection = useMemo(() => {
    const requiredPermissions =
      sectionPermissions[sectionParam as keyof typeof sectionPermissions];
    return requiredPermissions ? hasAnyPermission(requiredPermissions) : false;
  }, [sectionParam, sectionPermissions, hasAnyPermission]);

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
    const requiredPermissions =
      sectionPermissions[selectedFilter as keyof typeof sectionPermissions];
    if (!requiredPermissions || !hasAnyPermission(requiredPermissions)) {
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
      case "Onboarding Pages":
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
