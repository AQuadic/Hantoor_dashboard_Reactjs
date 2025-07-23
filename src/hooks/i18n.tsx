import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import headerEn from "../locales/en/header.json"
import headerAr from "../locales/ar/header.json"

i18n.use(initReactI18next).init({
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    ns: [
        "header",
    ],
    defaultNS: "header",
    resources: {
        en: {
        header: headerEn,
        },
        ar: {
        header: headerAr,
        },
    },
});

export default i18n;
