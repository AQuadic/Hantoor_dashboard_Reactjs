import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import ChangeLanguage from "./ChangeLanguage";
import { useQuery } from "@tanstack/react-query";
import defaultProfile from "/images/avatar.svg";
import { getCurrentAdmin, GetCurrentAdminResponse } from "@/api/profile/getProfile";

const LayoutHeader = () => {
  const {
    i18n: { language },t
  } = useTranslation('profile');

  const { data: admin, isLoading } = useQuery<GetCurrentAdminResponse>({
    queryKey: ["currentAdmin"],
    queryFn: getCurrentAdmin,
  });

  return (
    <header className="sticky left-0 right-0 top-0 z-50 w-full bg-[#F4F4FE]  border-l border-b h-[64px] md:px-14 px-4 flex items-center gap-4 justify-end">
      <Link to="/profile" className="flex items-center gap-2">
        <img
          src={admin?.image?.url || defaultProfile}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="flex items-center gap-1">
            <span className="">
              {isLoading ? "..." : admin?.name || (language === "ar" ? "الادمن" : "Admin")}
            </span>
            {language === "en" ? (
              <ChevronRight size={16} color="#2A32F8" />
            ) : (
              <ChevronLeft size={16} color="#2A32F8" />
            )}
          </p>
          <p className="text-xs opacity-50">
            {t('lastOnline')}{' '}
            {admin?.last_online
              ? new Date(admin.last_online).toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '...'}
          </p>
        </div>
      </Link>
      <div className="w-px h-12 bg-neutral-300"></div>

      <ChangeLanguage />
    </header>
  );
};

export default LayoutHeader;
