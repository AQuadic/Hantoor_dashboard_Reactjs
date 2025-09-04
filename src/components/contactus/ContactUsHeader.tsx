import DashboardDatePicker from "../general/dashboard/DashboardDatePicker"
import DashboardHeader from "../general/dashboard/DashboardHeader"
import SearchBar from "../general/dashboard/SearchBar"

type ContactUsHeaderProps = {
  search: string;
  setSearch: (value: string) => void;
};

const ContactUsHeader: React.FC<ContactUsHeaderProps> = ({ search, setSearch }) => {
    return (
        <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
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
                termAr={search}
                termEn={search}
                placeholder="ابحث بالاسم"
                setTermAr={setSearch}
                setTermEn={setSearch}
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
