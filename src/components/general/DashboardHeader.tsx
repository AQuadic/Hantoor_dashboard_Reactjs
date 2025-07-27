import React from "react";
import ChangeLanguage from "./ChangeLanguage";

const DashboardHeader = () => {
  return (
    <header className="bg-[#F4F4FE] border-l border-b py-6 px-14 flex items-center gap-4 justify-end">
      DashboardHeader
      <div className="w-0.5 h-full border"></div>
      <ChangeLanguage />
    </header>
  );
};

export default DashboardHeader;
