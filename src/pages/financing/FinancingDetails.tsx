import { useLocation } from "react-router-dom";
import DashboardDatePicker from '@/components/general/dashboard/DashboardDatePicker';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';
import SearchBar from '@/components/general/dashboard/SearchBar';
import React from 'react';
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import { Link } from "react-router";
import BanksTable from "@/components/financing/BanksTable";

const FinancingDetails = () => {
    const location = useLocation();
    const country = location.state?.country;

    return (
        <section>
            <div className="pt-2 pb-6 bg-white">
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
                <SearchBar term={""} setTerm={() => {}} />
                </div>
                <div className="flex-1">
                <DashboardDatePicker />
                </div>

                <Link to="/bank/add">
                    <DashboardButton title={"اضافة بنك جديد"} variant="add" />
                </Link>
            </div>
            </div>
            <BanksTable />
        </section>
    );
};

export default FinancingDetails;
