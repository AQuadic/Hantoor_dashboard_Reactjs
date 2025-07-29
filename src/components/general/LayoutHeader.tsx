import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import ProfileIcon from "../icons/header/ProfileIcon";
import ChangeLanguage from "./ChangeLanguage";

const LayoutHeader = () => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <header className="sticky left-0 right-0 top-0 z-50 w-full bg-[#F4F4FE]  border-l border-b py-6 px-14 flex items-center gap-4 justify-end">
      <Link to="/profile" className="flex items-center gap-2">
        <ProfileIcon />
        <div>
          <p className="flex items-center gap-1">
            <span className="">{language === "ar" ? "الادمن" : "Admin"}</span>
            {language === "en" ? (
              <ChevronRight size={16} color="#2A32F8" />
            ) : (
              <ChevronLeft size={16} color="#2A32F8" />
            )}
          </p>
          <p className="text-xs opacity-50">اخر ظهور 22/03/2025- 08:30 PM</p>
        </div>
      </Link>
      <div className="w-px h-12 bg-neutral-300"></div>

      <ChangeLanguage />
    </header>
  );
};

export default LayoutHeader;
