import { useLocation, useParams } from "react-router-dom";
import DashboardDatePicker from '@/components/general/dashboard/DashboardDatePicker';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';
import SearchBar from '@/components/general/dashboard/SearchBar';
import React from 'react';
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getRequestFinancing, FinancingRequest } from "@/api/financing/fetchFinancing";
import BanksTable from "@/components/financing/BanksTable";

const FinancingDetails = () => {
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const country = location.state?.country; 
  const countryIdFromState = location.state?.countryId;

  const country_id = countryIdFromState || (params.id ? Number(params.id) : undefined);

  console.log("country_id:", country_id);

const { data, isLoading, error } = useQuery<FinancingRequest[], Error>({
  queryKey: ["requestFinancing", country_id],
  queryFn: async () => {
    if (!country_id) return [];
    const requests = await getRequestFinancing({ country_id, pagination: false });
    console.log("Fetched requests:", requests);
    return requests;
  },
  enabled: !!country_id,
});


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
                        termAr={"ابحث بالاسم"}
                        termEn={"Search by name"}
                        setTermAr={() => {}} 
                        setTermEn={() => {}} 
                        />
                </div>
                <div className="flex-1">
                <DashboardDatePicker />
                </div>

                <Link to="/bank/add">
                    <DashboardButton titleAr={"اضافة بنك جديد"} titleEn="Add a new bank" variant="add" />

                </Link>
            </div>
            </div>
            <div className="md:px-8 px-2">
                <BanksTable />
            </div>
        </section>
    );
};

export default FinancingDetails;
