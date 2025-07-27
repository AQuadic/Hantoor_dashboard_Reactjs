import { ChevronLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import ProfileIcon from "../icons/header/ProfileIcon";
import ChangeLanguage from "./ChangeLanguage";

const DashboardHeader = () => {
  return (
    <header className="bg-[#F4F4FE] border-l border-b py-6 px-14 flex items-center gap-4 justify-end">
      <Link to="/profile" className="flex items-center gap-2">
        <ProfileIcon />
        <div>
          <p className="flex items-center gap-1">
            <span className="">الادمن</span>
            <ChevronLeft size={16} color="#2A32F8" />
          </p>
          <p className="text-xs opacity-50">اخر ظهور 22/03/2025- 08:30 PM</p>
        </div>
      </Link>
      <div className="w-px h-12 bg-neutral-300"></div>

      <ChangeLanguage />
    </header>
  );
};

export default DashboardHeader;
