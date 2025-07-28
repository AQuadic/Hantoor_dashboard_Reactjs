import DashboardHeader from "../general/dashboard/DashboardHeader"

const SettingHeader = () => {
    return (
        <DashboardHeader
            titleAr="الاعدادات"
            titleEn="Setting"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الاعدادات", titleEn: "Setting" },
            ]}
        />
    )
}

export default SettingHeader
