import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";

type TechnicalsupportHeaderProps = {
  search: string;
  setSearch: (value: string) => void;
};

const TechnicalsupportHeader: React.FC<TechnicalsupportHeaderProps> = ({
  search,
  setSearch,
}) => {
  return (
    <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
      <DashboardHeader
        titleAr="اسئلة الدعم الفني"
        titleEn="Technical support questions"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          {
            titleAr: "اسئلة الدعم الفني",
            titleEn: "Technical support questions",
          },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
        <div className="flex-1">
          <SearchBar
            termAr={search}
            termEn={search}
            placeholderAr="ابحث بالاسم"
            placeholderEn="Search by name"
            setTermAr={setSearch}
            setTermEn={setSearch}
          />
        </div>
        <div className="flex-1">
          <DashboardDatePicker />
        </div>
        <Link to="/technical-support/add">
          <DashboardButton
            titleAr={"اضافة سؤال جديد"}
            titleEn="Add a new question"
            variant="add"
          />
        </Link>
      </div>
    </div>
  );
};

export default TechnicalsupportHeader;
