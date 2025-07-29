import DashboardHeader from '../general/dashboard/DashboardHeader'
import SearchBar from '../general/dashboard/SearchBar'
import DashboardDatePicker from '../general/dashboard/DashboardDatePicker'

const FinancingHeader = () => {
    return (
        <div className="pt-2 pb-6 bg-white ">
        <DashboardHeader
            titleAr="التمويل"
            titleEn="Financing"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "التمويل", titleEn: "Financing" },
            ]}
        />

        <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
            <div className="flex-1">
            <SearchBar term={"ابحث بالاسم"} setTerm={() => {}} />
            </div>
            <div className="flex-1">
            <DashboardDatePicker />
            </div>
        </div>
        </div>
    )
}

export default FinancingHeader
