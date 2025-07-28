import React from 'react'
import TabsFilter from '../general/dashboard/TabsFilter'

interface SubordinatesHeaderProps {
    selectedFilter: string;
    setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const SettingTabs: React.FC<SubordinatesHeaderProps> = ({
    selectedFilter,
    setSelectedFilter,
}) => {

    const filtersData = [
        { titleAr: "اعدادات عامة", titleEn: "General Settings" },
        { titleAr: "زر طلب تفاصيل سعر التأمين", titleEn: "Insurance Price Request Button" },
        { titleAr: "الصفحات التعريفية", titleEn: "Informational Pages" },
        { titleAr: "الصور الاعلانية", titleEn: "Promotional Images" },
        { titleAr: "الشروط والاحكام", titleEn: "Terms and Conditions" },
        { titleAr: "روابط التواصل الاجتماعي", titleEn: "Social Media Links" },
        { titleAr: "مميزات التطبيق", titleEn: "App Features" },
    ];

    return (
        <div>
            <TabsFilter
                filters={filtersData}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />
        </div>
    )
}

export default SettingTabs
