import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import EditProfileForm from "@/components/profile/EditProfileForm";
import React from "react";

const ProfilePage = () => {
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
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
      <EditProfileForm
        profileImage={profileImage}
        setProfileImage={setProfileImage}
      />
    </section>
  );
};

export default ProfilePage;
