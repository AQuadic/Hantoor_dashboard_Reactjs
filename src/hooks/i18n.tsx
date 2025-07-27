import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import headerAr from "../locales/ar/header.json";
import loginAr from "../locales/ar/login.json";
import headerEn from "../locales/en/header.json";
import loginEn from "../locales/en/login.json";

const savedLang = localStorage.getItem("language") || "en";

// Initialize i18n
i18n.use(initReactI18next).init({
  lng: savedLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  ns: ["header"],
  defaultNS: "header",
  resources: {
    en: {
      header: headerEn,
      login: loginEn,
    },
    ar: {
      header: headerAr,
      login: loginAr,
    },
  },
});

// ✅ Automatically update <html dir=""> on language change
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
});

export default i18n;
