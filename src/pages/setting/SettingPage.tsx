import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  const sectionParam = searchParams.get("section") || "General Settings";

  const [selectedFilter, setSelectedFilter] = useState(sectionParam);

  useEffect(() => {
    setSearchParams({ section: selectedFilter });
  }, [selectedFilter]);

  const renderSection = () => {
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
                    setSelectedFilter={setSelectedFilter}
                />
            </div>

        <div className="mt-4">{renderSection()}</div>
        </div>
    );
};

export default SettingPage;
