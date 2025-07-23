import DashboardButton from "@/components/general/dashboard/DashboardButton";
import React from "react";

const Testing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <DashboardButton
        title="Dashboard"
        variant="add"
        onClick={() => console.log("Dashboard clicked")}
      />
    </div>
  );
};

export default Testing;
