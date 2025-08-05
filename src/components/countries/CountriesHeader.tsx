import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";

const CountriesHeader = () => {
    return (
        <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
        <DashboardHeader
            titleAr="البلاد"
            titleEn="Countries"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "البلاد", titleEn: "Countries" },
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
            <Link to="/countries/add">
            <DashboardButton titleAr={"اضافة بلد جديدة"} titleEn={"Add new country"} variant="add" />
            </Link>
        </div>
        </div>
    )
}

export default CountriesHeader
