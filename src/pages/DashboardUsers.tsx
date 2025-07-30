import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardDatePicker from "@/components/general/dashboard/DashboardDatePicker";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import SearchBar from "@/components/general/dashboard/SearchBar";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import UserSelects from "@/components/users/UserSelects";
import { UserTable } from "@/components/users/UsersTable";
import { Link } from "react-router";
const DashboardUsers = () => {
  return (
    <section>
      <div className="py-2 bg-white">
        <DashboardHeader 
          titleAr={"المستخدمين"} titleEn={"Users"} 
          items={[{
            titleAr: "لوحة التحكم", link: "/",
            titleEn: "Dashboard"
          }, 
          { titleAr: "المستخدمين", link: "/",
            titleEn: "Users"
          },]}
        />

        <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
          <div className="flex-1">
            <SearchBar
            termAr={"ابحث بالاسم, رقم الجوال, البريد الالكتروني"}
            termEn={"Search by name, mobile number, email"}
            setTermAr={() => {}} 
            setTermEn={() => {}} 
            />
          </div>
          <div className="flex-1">
            <DashboardDatePicker />
          </div>
          <Link to="/users/add">
            <DashboardButton 
              titleAr={"إضافة مستخدم جديد"} 
              titleEn={"Add new user"}
              variant="add" />
          </Link>
        </div>

        <UserSelects />
      </div>
      <div className="px-2 md:px-8">
        <UserTable />

        <TablePagination
          currentPage={0}
          setCurrentPage={function (): void {
            throw new Error("Function not implemented.");
          }}
          totalPages={0}
          totalItems={0}
          itemsPerPage={0}
        />
      </div>
    </section>
  );
};

export default DashboardUsers;
