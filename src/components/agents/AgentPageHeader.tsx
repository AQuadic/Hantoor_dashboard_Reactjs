import { Link } from 'react-router'
import DashboardDatePicker from '../general/dashboard/DashboardDatePicker'
import DashboardHeader from '../general/dashboard/DashboardHeader'
import SearchBar from '../general/dashboard/SearchBar'
import DashboardButton from '../general/dashboard/DashboardButton'

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
            <Link to="/agent/add">
                <DashboardButton titleAr={"اضافة وكيل جديد"} titleEn={"Add new agent"} variant="add" />
            </Link>
        </div>
        </div>
    )
}

export default AgentPageHeader
