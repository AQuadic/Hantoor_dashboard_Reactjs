import DashboardHeader from "../general/dashboard/DashboardHeader"
import TabsFilter from "../general/dashboard/TabsFilter"

interface SubordinatesHeaderProps {
    selectedFilter: string;
    setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const AgentsHeader : React.FC<SubordinatesHeaderProps> = ({
    selectedFilter,
    setSelectedFilter,
}) => {
    return (
        <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
            titleAr="تفاصيل الوكيل"
            titleEn="Agent details"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الوكلاء", titleEn: "Agents", link: "/" },
            { titleAr: "تفاصيل الوكيل", titleEn: "Agent details" },
            ]}
        />
        <div className="flex items-center gap-2 px-8 pb-4">
            <img src="/images/agentAvatar.svg" alt="Avatar" />
            <h3 className="text-[#1E1B1B] text-xl">الشركة الدولية التجارية</h3>
        </div>
        <TabsFilter
            filters={[
            {
                titleAr: "مراكز الصيانة",
                titleEn: "Maintenance centers",
            },
            {
                titleAr: "معارض البيع",
                titleEn: "Sales Showrooms",
            },
            ]}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
        />
        </div>
    )
}

export default AgentsHeader
