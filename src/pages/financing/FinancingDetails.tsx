import { useLocation, useParams, Link } from "react-router-dom";
import DashboardDatePicker from '@/components/general/dashboard/DashboardDatePicker';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';
import SearchBar from '@/components/general/dashboard/SearchBar';
import React from 'react';
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import BanksTable from "@/components/financing/BanksTable";

const FinancingDetails = () => {
  const location = useLocation();
  const params = useParams<{ id: string }>();

  const country = location.state?.country;
  const countryId = location.state?.countryId || params.id;

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
            <SearchBar termAr="ابحث بالاسم" termEn="Search by name" setTermAr={() => {}} setTermEn={() => {}} />
          </div>
          <div className="flex-1">
            <DashboardDatePicker />
          </div>

          {countryId && (
            <Link to={`/bank/add/${countryId}`}>
              <DashboardButton titleAr="اضافة بنك جديد" titleEn="Add a new bank" variant="add" />
            </Link>
          )}
        </div>
      </div>

      <div className="md:px-8 px-2 mt-4">
        <BanksTable countryId={countryId} />
      </div>
    </section>
  );
};

export default FinancingDetails;