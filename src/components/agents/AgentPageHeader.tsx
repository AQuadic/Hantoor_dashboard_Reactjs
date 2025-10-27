import { Link } from "react-router";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import DashboardButton from "../general/dashboard/DashboardButton";
import { useHasPermission } from "@/hooks/usePermissions";

interface AgentPageHeaderProps {
  setSearchTerm: (term: string) => void;
  dateRange: any;
  setDateRange: (val: any) => void;
  countryId?: number;
  setCountryId: (val?: number) => void;
}

const AgentPageHeader: React.FC<AgentPageHeaderProps> = ({
  setSearchTerm,
  dateRange,
  setDateRange,
}) => {
  const canCreate = useHasPermission("create_agent");

  return (
    <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
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
            termAr={""}
            termEn={""}
            setTermAr={setSearchTerm}
            setTermEn={setSearchTerm}
            placeholderAr="ابحث بالاسم"
            placeholderEn="Search by name"
          />
        </div>
        <div className="flex-1">
          <DashboardDatePicker value={dateRange} onChange={setDateRange} />
        </div>
        {canCreate && (
          <Link to="/agent/add">
            <DashboardButton
              titleAr={"اضافة وكيل جديد"}
              titleEn={"Add new agent"}
              variant="add"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default AgentPageHeader;
