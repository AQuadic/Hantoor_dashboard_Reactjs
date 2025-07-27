import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import headerAr from "../locales/ar/header.json";
import loginAr from "../locales/ar/login.json";
import headerEn from "../locales/en/header.json";
import loginEn from "../locales/en/login.json";

// Ensure we're in browser environment
const savedLang =
  typeof window !== "undefined"
    ? localStorage.getItem("language") || "en"
    : "en";

// Initialize i18n
i18n.use(initReactI18next).init({
  lng: savedLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  ns: ["header", "login"], // Add all namespaces you're using
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

// Set initial direction based on saved language
if (typeof document !== "undefined") {
  document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
}

// Handle language changes
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  }
});

export default i18n;
