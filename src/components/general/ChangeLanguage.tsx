import { Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ChangeLanguage = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    // Ensure we have the correct language on mount
    const savedLang = localStorage.getItem("language") || "en";
    if (i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
    setCurrentLang(i18n.language);
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  console.log("Current language:", currentLang);

  return (
    <Button
      className="flex items-center justify-center !w-[44px] !h-[44px] text-lg bg-white"
      radius="full"
      isIconOnly
      onPress={toggleLanguage}
    >
      {currentLang === "en" ? "AR" : "EN"}
    </Button>
  );
};

export default ChangeLanguage;
