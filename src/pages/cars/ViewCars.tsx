import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import React from "react";

const ViewCars = () => {
  return (
    <div>
      <DashboardHeader
        titleAr="تفاصيل السيارة"
        titleEn="Car details"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "السيارات", titleEn: "Cars" },
          { titleAr: "تفاصيل السيارة", titleEn: "Car details" },
        ]}
      />
    </div>
  );
};

export default ViewCars;
