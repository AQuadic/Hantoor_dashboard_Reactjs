import DashboardChart from "@/components/dashboard/DashboardChart";
import DashboardHeader from "@/components/dashboard/HeaderDashboard";
import NOUsers from "@/components/dashboard/NOUsers";
import Status from "@/components/dashboard/Status";
import React from "react";

const HomePage = () => {
  return (
    <div>
        <DashboardHeader />
        <Status />
        <div className="flex flex-wrap gap-[22px] mx-8">
          <DashboardChart />
          <NOUsers />
        </div>
    </div>
  )
};

export default HomePage;
