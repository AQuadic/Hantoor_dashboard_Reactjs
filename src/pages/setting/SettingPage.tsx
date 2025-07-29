import React, { useState } from "react";
import SettingHeader from "@/components/setting/SettingHeader";
import SettingTabs from "@/components/setting/SettingTabs";
import GeneralSettings from "@/components/setting/GeneralSettings";
import InsurancePage from "./InsurancePage";

const SettingPage = () => {
    const [selectedFilter, setSelectedFilter] = useState("General Settings");

    return (
        <div>
            <div className="pt-2 pb-6 bg-white">
                <SettingHeader />
                <SettingTabs
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                />
            </div>

            <div className="mt-4">
                {selectedFilter === "General Settings" && <GeneralSettings />}
                {selectedFilter === "Insurance Price Request Button" && <InsurancePage />}
            </div>
        </div>
    );
};

export default SettingPage;
