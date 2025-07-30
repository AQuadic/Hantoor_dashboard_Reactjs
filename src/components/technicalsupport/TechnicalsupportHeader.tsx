import { Link } from "react-router"
import DashboardButton from "../general/dashboard/DashboardButton"
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker"
import DashboardHeader from "../general/dashboard/DashboardHeader"
import SearchBar from "../general/dashboard/SearchBar"

const TechnicalsupportHeader = () => {
    return (
        <div className="pt-2 pb-6 bg-white ">
        <DashboardHeader
            titleAr="اسئلة الدعم الفني"
            titleEn="Technical support questions"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "اسئلة الدعم الفني", titleEn: "Technical support questions" },
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
            <Link to="/technical-support/add">
                <DashboardButton titleAr={"اضافة سؤال جديد"} titleEn="Add a new question" variant="add" />
            </Link>
        </div>
        </div>
    )
}

export default TechnicalsupportHeader
