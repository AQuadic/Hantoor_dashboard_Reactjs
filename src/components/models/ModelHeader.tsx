import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import TabsFilter from "../general/dashboard/TabsFilter";

interface SubordinatesHeaderProps {
    selectedFilter: string;
    setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const ModelHeader: React.FC<SubordinatesHeaderProps> = ({
    selectedFilter,
    setSelectedFilter,
}) => {
    const filtersData = [
        { titleAr: "الموديلات", titleEn: "Models" },
        { titleAr: "انواع الهيكل", titleEn: "Body Types" },
        { titleAr: "انواع السيارة", titleEn: "Car Types" },
        { titleAr: "الفئات", titleEn: "Categories" },
        { titleAr: "منشأ الماركة", titleEn: "Brand Origin" },
        { titleAr: "عدد المقاعد", titleEn: "Number of Seats" },
        { titleAr: "انواع الماكينة", titleEn: "Engine Types" },
        { titleAr: "احجام الماكينة", titleEn: "Engine Sizes" },
        { titleAr: "السعر من", titleEn: "Price From" },
        { titleAr: "السعر الى", titleEn: "Price To" },
    ];

    return (
        <div className="pt-2 pb-6 bg-white">
            <DashboardHeader
                titleAr="اقسام السيارات"
                titleEn="Car Sections"
                items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "اقسام السيارات", titleEn: "Car Sections" },
                ]}
            />

            <TabsFilter
                filters={filtersData}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />

            <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
                <div className="flex-1">
                    <SearchBar term={""} setTerm={() => {}} />
                </div>
                <div className="flex-1">
                    <DashboardDatePicker />
                </div>
                <Link to="/">
                    <DashboardButton title="اضافة موديل جديد" variant="add" />
                </Link>
            </div>
        </div>
    );
};

export default ModelHeader;
