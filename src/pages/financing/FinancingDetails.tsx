import { useLocation, useParams, Link } from "react-router-dom";
import DashboardDatePicker from "@/components/general/dashboard/DashboardDatePicker";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import SearchBar from "@/components/general/dashboard/SearchBar";
import React from "react";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import BanksTable from "@/components/financing/BanksTable";
import { useTranslation } from "react-i18next";
import { useDatePicker } from "@/hooks/useDatePicker";

const FinancingDetails = () => {
  const location = useLocation();
  const params = useParams<{ id: string }>();

  const country = location.state?.country;
  const countryId = location.state?.countryId || params.id;

  const [searchTermAr, setSearchTermAr] = React.useState("");
  const [searchTermEn, setSearchTermEn] = React.useState("");
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const searchTerm = isArabic ? searchTermAr : searchTermEn;

  const {
    dateRange: financingDateRange,
    setDateRange: setFinancingDateRange,
    dateParams,
  } = useDatePicker();

  return (
    <section>
      <div className="pt-0 pb-2 bg-white">
        <DashboardHeader
          titleAr="التمويل"
          titleEn="Financing"
          subtitleAr={country ? ` ${country}` : "-"}
          subtitleEn={country ? ` ${country}` : "-"}
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "التمويل", titleEn: "Financing" },
          ]}
        />

        <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
          <div className="flex-1">
            <SearchBar
              termAr={searchTermAr}
              termEn={searchTermEn}
              setTermAr={setSearchTermAr}
              setTermEn={setSearchTermEn}
              placeholderAr="ابحث بالاسم"
              placeholderEn="Search by name"
            />
          </div>
          <div className="flex-1">
            <DashboardDatePicker
              value={financingDateRange}
              onChange={setFinancingDateRange}
            />
          </div>

          {countryId && (
            <Link to={`/bank/add/${countryId}`}>
              <DashboardButton
                titleAr="اضافة بنك جديد"
                titleEn="Add a new bank"
                variant="add"
              />
            </Link>
          )}
        </div>
      </div>

      <div className="md:px-8 px-2 mt-4">
        <BanksTable
          countryId={countryId}
          searchTerm={searchTerm}
          dateParams={dateParams}
        />
      </div>
    </section>
  );
};

export default FinancingDetails;
