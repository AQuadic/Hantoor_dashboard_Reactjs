import React from "react";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../general/ChangeLanguage";

const HeaderDashboard = () => {
  const { t } = useTranslation("header");
  return (
    <div className="pt-2 pb-2 px-8 bg-white flex items-center justify-between">
      <p className="text-[#7A808A] text-sm font-normal">{t("dashboard")}</p>
      <ChangeLanguage />
    </div>
  );
};

export default HeaderDashboard;
