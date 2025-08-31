import { useLocation, useParams } from "react-router-dom";
import DashboardDatePicker from '@/components/general/dashboard/DashboardDatePicker';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';
import SearchBar from '@/components/general/dashboard/SearchBar';
import React, { useState } from 'react';
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRequestFinancing, FinancingRequest } from "@/api/financing/fetchFinancing";
import BanksTable from "@/components/financing/BanksTable";

const FinancingDetails = () => {
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const [searchTermAr, setSearchTermAr] = useState("");
  const [searchTermEn, setSearchTermEn] = useState("");
  
  const country = location.state?.country; 
  const countryIdFromState = location.state?.countryId;

  const country_id = countryIdFromState
    ? Number(countryIdFromState)
    : params.id
    ? Number(params.id)
    : 1;

  const { data, isLoading, error, refetch } = useQuery<FinancingRequest[], Error>({
    queryKey: ["requestFinancing", country_id],
    queryFn: async () => {
      try {
        const requests = await getRequestFinancing({ country_id, pagination: false });
        return requests || [];
      } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
      }
    },
    enabled: !!country_id,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

        return (
          <section>
            <div className="pt-0 pb-2 bg-white">
            <DashboardHeader
                titleAr="التمويل"
                titleEn="Financing"
                subtitleAr={country ? `${country}` : `Country ID: ${country_id}`}
                subtitleEn={country ? `${country}` : `Country ID: ${country_id}`}
                items={[
                  { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                  { titleAr: "التمويل", titleEn: "Financing", link: "/financing" },
                  { titleAr: country || "التفاصيل", titleEn: country || "Details" },
                ]}
            />

            <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
                <div className="flex-1">
                    <SearchBar
                        termAr={searchTermAr}
                        termEn={searchTermEn}
                        setTermAr={setSearchTermAr}
                        setTermEn={setSearchTermEn}
                    />
                </div>
                <div className="flex-1">
                <DashboardDatePicker />
              </div>
              
              <Link
                to="/bank/add"
                state={{ countryId: country_id, countryName: country }}
              >
                <DashboardButton
                  titleAr="اضافة بنك جديد"
                  titleEn="Add a new bank"
                  variant="add"
                />
              </Link>
            </div>
          </div>
          
          <div className="md:px-8 px-2 mt-6">
            <BanksTable 
              data={data || []} 
              isLoading={isLoading} 
              error={error} 
              refetch={refetch}
            />
            </div>
        </section>
    );
};

export default FinancingDetails;
