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
  const [searchParams] = useSearchParams();
  const sectionParam = searchParams.get("section") || "General Settings";

  const [selectedFilter, setSelectedFilter] = useState(sectionParam);

  useEffect(() => {
    setSelectedFilter(sectionParam);
  }, [sectionParam]);

    return (
        <div>
            <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
                <SettingHeader />
                <SettingTabs
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                />
            </div>

            <div className="mt-4">
                {selectedFilter === "General Settings" && <GeneralSettings />}
                {selectedFilter === "Insurance Price Request Button" && <InsurancePage />}
                {selectedFilter === "Informational Pages" && <ProfileSetting />}
                {selectedFilter === "Advertising Images" && <AdvertisingImages />}
                {selectedFilter === "Terms and Conditions" && <TermsAndConditions />}
                {selectedFilter === "Social Media Links" && <SocialMediaPage />}
                {selectedFilter === "App Features" && <FeaturesPage />}
            </div>
        </div>
    );
};

export default SettingPage;
