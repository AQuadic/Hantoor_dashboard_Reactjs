import DashboardHeader from '../general/dashboard/DashboardHeader'
import SearchBar from '../general/dashboard/SearchBar'
import DashboardDatePicker from '../general/dashboard/DashboardDatePicker'

const SupportMessagesHeader = () => {
    return (
        <div className="pt-2 pb-6 bg-white ">
        <DashboardHeader
            titleAr="رسائل الدعم"
            titleEn="Support messages"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "رسائل الدعم", titleEn: "Support messages" },
            ]}
        />

        <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
            <div className="flex-1">
            <SearchBar
                termAr={"ابحث بالاسم"}
                termEn={"Search by name"}
                setTermAr={() => {}} 
                setTermEn={() => {}} 
                />
            </div>
            <div className="flex-1">
            <DashboardDatePicker />
            </div>
        </div>
        </div>
    )
}

export default SupportMessagesHeader
