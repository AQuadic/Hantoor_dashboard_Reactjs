import DashboardDatePicker from "../general/dashboard/DashboardDatePicker"
import DashboardHeader from "../general/dashboard/DashboardHeader"
import SearchBar from "../general/dashboard/SearchBar"

const ContactUsHeader = () => {
    return (
        <div className="pt-2 pb-6 bg-white border-b border-[#E1E1E1]">
        <DashboardHeader
            titleAr="تواصل معنا"
            titleEn="Contact us"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "تواصل معنا", titleEn: "Contact us" },
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

export default ContactUsHeader
