import ProfileHeader from "@/components/setting/profile/ProfileHeader";
import ProfileTable from "@/components/setting/profile/ProfileTable";
import React, { useState } from "react";

const ProfileSetting = () => {
  const [countryId, setCountryId] = useState<string>("");

  return (
    <div className="px-2 md:px-8">
      <ProfileHeader countryId={countryId} setCountryId={setCountryId} />
      <ProfileTable countryId={countryId} />
    </div>
  );
};

export default ProfileSetting;
