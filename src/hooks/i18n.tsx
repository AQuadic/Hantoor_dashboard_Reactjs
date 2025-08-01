import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import headerAr from "../locales/ar/header.json";
import headerEn from "../locales/en/header.json";

import loginAr from "../locales/ar/login.json";
import loginEn from "../locales/en/login.json";

import usersAr from "../locales/ar/users.json";
import usersEn from "../locales/en/users.json";

import countryAr from "../locales/ar/country.json";
import countryEn from "../locales/en/country.json";

import brandsAr from "../locales/ar/brands.json";
import brandsEn from "../locales/en/brands.json";

import agentsAr from "../locales/ar/agents.json";
import agentsEn from "../locales/en/agents.json";

import modelsAr from "../locales/ar/models.json";
import modelsEn from "../locales/en/models.json";

import financingAr from "../locales/ar/financing.json";
import financingEn from "../locales/en/financing.json";

// Ensure we're in browser environment
const savedLang =
  typeof window !== "undefined"
    ? localStorage.getItem("language") || "ar"
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
      users: usersEn,
      country: countryEn,
      brands: brandsEn,
      agents: agentsEn,
      models: modelsEn,
      financing: financingEn,
    },
    ar: {
      header: headerAr,
      login: loginAr,
      users: usersAr,
      country: countryAr,
      brands: brandsAr,
      agents: agentsAr,
      models: modelsAr,
      financing: financingAr,
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
