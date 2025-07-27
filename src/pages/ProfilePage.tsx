import DashboardHeader from "@/components/general/dashboard/LayoutHeader";
import React from "react";

const ProfilePage = () => {
  return (
    <section>
      <DashboardHeader
        titleAr="الملف الشخصي"
        titleEn="Profile"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "الملف الشخصي", titleEn: "Profile" },
        ]}
      />
    </section>
  );
};

export default ProfilePage;
