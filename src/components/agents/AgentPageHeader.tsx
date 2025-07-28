import DashboardDatePicker from '../general/dashboard/DashboardDatePicker'
import DashboardHeader from '../general/dashboard/DashboardHeader'
import SearchBar from '../general/dashboard/SearchBar'

const AgentPageHeader = () => {
    return (
        <div className="pt-2 pb-6 bg-white ">
        <DashboardHeader
            titleAr="الوكلاء"
            titleEn="Agents"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الوكلاء", titleEn: "Agents", link: "/" },
            ]}
        />
        <div className="flex flex-wrap items-center px-2 md:px-8">
            <div className="flex-1">
            <SearchBar term={""} setTerm={() => {}} />
            </div>
            <div className="flex-1">
            <DashboardDatePicker />
            </div>
        </div>
        </div>
    )
}

export default AgentPageHeader
