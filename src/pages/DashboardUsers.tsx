import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardDatePicker from "@/components/general/dashboard/DashboardDatePicker";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import SearchBar from "@/components/general/dashboard/SearchBar";
import TablePagination from "@/components/general/dashboard/table/TablePagination";
import UserSelects from "@/components/users/UserSelects";
import { UserTable } from "@/components/users/UsersTable";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useState } from "react";

const DashboardUsers = () => {
  const { t } = useTranslation("users");

  const [searchTermAr, setSearchTermAr] = useState("");
  const [searchTermEn, setSearchTermEn] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [meta, setMeta] = useState<any>(null);

  const activeSearchTerm = searchTermEn || searchTermAr;

  return (
    <section>
      <div className="py-2 bg-white border-b border-[#E1E1E1]">
        <DashboardHeader
          titleAr={"المستخدمين"}
          titleEn={"Users"}
          items={[
            {
              titleAr: "لوحة التحكم",
              link: "/",
              titleEn: "Dashboard",
            },
            { titleAr: "المستخدمين", link: "/", titleEn: "Users" },
          ]}
        />

        <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
          <div className="flex-1">
            <SearchBar
              termAr={searchTermAr}
              termEn={searchTermEn}
              placeholder={t("searchBy")}
              setTermAr={setSearchTermAr}
              setTermEn={setSearchTermEn}
            />
          </div>
          <div className="flex-1">
            <DashboardDatePicker />
          </div>
          <Link to="/users/add">
            <DashboardButton
              titleAr={"إضافة مستخدم جديد"}
              titleEn={"Add new user"}
              variant="add"
            />
          </Link>
        </div>

        <UserSelects />
      </div>
      <div className="px-2 md:px-8">
        <UserTable
          searchTerm={activeSearchTerm}
          page={currentPage}
          perPage={perPage}
          onDataLoaded={setMeta}
        />
        {meta && meta.total > 0 && (
          <TablePagination
            currentPage={meta.current_page}
            setCurrentPage={setCurrentPage}
            totalPages={meta.last_page || 1}
            totalItems={meta.total || 0}
            itemsPerPage={meta.per_page}
            from={meta.from}
            to={meta.to}
          />
        )}
      </div>
    </section>
  );
};

export default DashboardUsers;
