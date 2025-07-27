import { Button } from "@heroui/react";
import React from "react";
import { useTranslation } from "react-i18next";

const ChangeLanguage = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  console.log("Current language:", i18n.language);

  return (
    <Button
      className="flex items-center justify-center !w-12 !h-12 text-lg bg-white"
      radius="full"
      isIconOnly
      onClick={toggleLanguage}
    >
      {i18n.language === "en" ? "AR" : "EN"}
    </Button>
  );
};

export default ChangeLanguage;
