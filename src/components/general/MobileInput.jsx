import { Input } from "@/components/ui/input.jsx";
import { getCountryDataList } from "countries-list";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "../ui/label";

const MobileInput = ({
  selectedCountry,
  setSelectedCountry,
  phone,
  setPhone,
  label,
  labelClassName = "",
  inputClassName = "",
  disabled = false,
}) => {
  console.log("MobileInput - selectedCountry:", phone);
  const { t, i18n } = useTranslation("users");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const countries = useMemo(() => getCountryDataList(), []);

  // Function to get country name in the current language
  const getCountryName = (country) => {
    const currentLanguage = i18n.language;

    // Map i18n language codes to countries-list language codes
    const languageMap = {
      ar: "native", // Arabic - using native names as fallback
      en: "name", // English
      // Add more language mappings as needed
    };

    const languageKey = languageMap[currentLanguage] || "name";

    // For Arabic, you might want to use a custom mapping or the native names
    // Since countries-list might not have Arabic names, you could create a custom mapping
    if (currentLanguage === "ar") {
      // Complete Arabic country names mapping for all ISO 3166-1 countries
      const arabicCountryNames = {
        AD: "أندورا",
        AE: "الإمارات العربية المتحدة",
        AF: "أفغانستان",
        AG: "أنتيغوا وبربودا",
        AI: "أنغيلا",
        AL: "ألبانيا",
        AM: "أرمينيا",
        AO: "أنغولا",
        AQ: "القارة القطبية الجنوبية",
        AR: "الأرجنتين",
        AS: "ساموا الأمريكية",
        AT: "النمسا",
        AU: "أستراليا",
        AW: "أروبا",
        AX: "جزر آلاند",
        AZ: "أذربيجان",
        BA: "البوسنة والهرسك",
        BB: "بربادوس",
        BD: "بنغلاديش",
        BE: "بلجيكا",
        BF: "بوركينا فاسو",
        BG: "بلغاريا",
        BH: "البحرين",
        BI: "بوروندي",
        BJ: "بنين",
        BL: "سان بارتيليمي",
        BM: "برمودا",
        BN: "بروناي",
        BO: "بوليفيا",
        BQ: "بونير وسينت أوستاتيوس وسابا",
        BR: "البرازيل",
        BS: "الباهاما",
        BT: "بوتان",
        BV: "جزيرة بوفيت",
        BW: "بوتسوانا",
        BY: "بيلاروسيا",
        BZ: "بليز",
        CA: "كندا",
        CC: "جزر كوكوس",
        CD: "جمهورية الكونغو الديمقراطية",
        CF: "جمهورية أفريقيا الوسطى",
        CG: "الكونغو",
        CH: "سويسرا",
        CI: "ساحل العاج",
        CK: "جزر كوك",
        CL: "تشيلي",
        CM: "الكاميرون",
        CN: "الصين",
        CO: "كولومبيا",
        CR: "كوستاريكا",
        CU: "كوبا",
        CV: "الرأس الأخضر",
        CW: "كوراساو",
        CX: "جزيرة الكريسماس",
        CY: "قبرص",
        CZ: "التشيك",
        DE: "ألمانيا",
        DJ: "جيبوتي",
        DK: "الدنمارك",
        DM: "دومينيكا",
        DO: "جمهورية الدومينيكان",
        DZ: "الجزائر",
        EC: "الإكوادور",
        EE: "إستونيا",
        EG: "مصر",
        EH: "الصحراء الغربية",
        ER: "إريتريا",
        ES: "إسبانيا",
        ET: "إثيوبيا",
        FI: "فنلندا",
        FJ: "فيجي",
        FK: "جزر فوكلاند",
        FM: "ميكرونيسيا",
        FO: "جزر فارو",
        FR: "فرنسا",
        GA: "الغابون",
        GB: "المملكة المتحدة",
        GD: "غرينادا",
        GE: "جورجيا",
        GF: "غويانا الفرنسية",
        GG: "غيرنسي",
        GH: "غانا",
        GI: "جبل طارق",
        GL: "جرينلاند",
        GM: "غامبيا",
        GN: "غينيا",
        GP: "غوادلوب",
        GQ: "غينيا الاستوائية",
        GR: "اليونان",
        GS: "جورجيا الجنوبية وجزر ساندويتش الجنوبية",
        GT: "غواتيمالا",
        GU: "غوام",
        GW: "غينيا بيساو",
        GY: "غويانا",
        HK: "هونغ كونغ",
        HM: "جزيرة هيرد وجزر ماكدونالد",
        HN: "هندوراس",
        HR: "كرواتيا",
        HT: "هايتي",
        HU: "المجر",
        ID: "إندونيسيا",
        IE: "أيرلندا",
        IL: "إسرائيل",
        IM: "جزيرة مان",
        IN: "الهند",
        IO: "إقليم المحيط الهندي البريطاني",
        IQ: "العراق",
        IR: "إيران",
        IS: "آيسلندا",
        IT: "إيطاليا",
        JE: "جيرسي",
        JM: "جامايكا",
        JO: "الأردن",
        JP: "اليابان",
        KE: "كينيا",
        KG: "قيرغيزستان",
        KH: "كمبوديا",
        KI: "كيريباتي",
        KM: "جزر القمر",
        KN: "سانت كيتس ونيفيس",
        KP: "كوريا الشمالية",
        KR: "كوريا الجنوبية",
        KW: "الكويت",
        KY: "جزر كايمان",
        KZ: "كازاخستان",
        LA: "لاوس",
        LB: "لبنان",
        LC: "سانت لوسيا",
        LI: "ليختنشتاين",
        LK: "سريلانكا",
        LR: "ليبيريا",
        LS: "ليسوتو",
        LT: "ليتوانيا",
        LU: "لوكسمبورغ",
        LV: "لاتفيا",
        LY: "ليبيا",
        MA: "المغرب",
        MC: "موناكو",
        MD: "مولدوفا",
        ME: "الجبل الأسود",
        MF: "سان مارتن",
        MG: "مدغشقر",
        MH: "جزر مارشال",
        MK: "مقدونيا الشمالية",
        ML: "مالي",
        MM: "ميانمار",
        MN: "منغوليا",
        MO: "ماكاو",
        MP: "جزر ماريانا الشمالية",
        MQ: "مارتينيك",
        MR: "موريتانيا",
        MS: "مونتسرات",
        MT: "مالطا",
        MU: "موريشيوس",
        MV: "المالديف",
        MW: "ملاوي",
        MX: "المكسيك",
        MY: "ماليزيا",
        MZ: "موزمبيق",
        NA: "ناميبيا",
        NC: "كاليدونيا الجديدة",
        NE: "النيجر",
        NF: "جزيرة نورفولك",
        NG: "نيجيريا",
        NI: "نيكاراغوا",
        NL: "هولندا",
        NO: "النرويج",
        NP: "نيبال",
        NR: "ناورو",
        NU: "نيوي",
        NZ: "نيوزيلندا",
        OM: "عمان",
        PA: "بنما",
        PE: "بيرو",
        PF: "بولينيسيا الفرنسية",
        PG: "بابوا غينيا الجديدة",
        PH: "الفلبين",
        PK: "باكستان",
        PL: "بولندا",
        PM: "سان بيير وميكلون",
        PN: "جزر بيتكايرن",
        PR: "بورتوريكو",
        PS: "فلسطين",
        PT: "البرتغال",
        PW: "بالاو",
        PY: "باراغواي",
        QA: "قطر",
        RE: "ريونيون",
        RO: "رومانيا",
        RS: "صربيا",
        RU: "روسيا",
        RW: "رواندا",
        SA: "المملكة العربية السعودية",
        SB: "جزر سليمان",
        SC: "سيشيل",
        SD: "السودان",
        SE: "السويد",
        SG: "سنغافورة",
        SH: "سانت هيلينا وأسينشين وتريستان دا كونها",
        SI: "سلوفينيا",
        SJ: "سفالبارد وجان ماين",
        SK: "سلوفاكيا",
        SL: "سيراليون",
        SM: "سان مارينو",
        SN: "السنغال",
        SO: "الصومال",
        SR: "سورينام",
        SS: "جنوب السودان",
        ST: "ساو تومي وبرينسيبي",
        SV: "السلفادور",
        SX: "سينت مارتن",
        SY: "سوريا",
        SZ: "إسواتيني",
        TC: "جزر توركس وكايكوس",
        TD: "تشاد",
        TF: "الأقاليم الجنوبية الفرنسية",
        TG: "توغو",
        TH: "تايلاند",
        TJ: "طاجيكستان",
        TK: "توكيلاو",
        TL: "تيمور الشرقية",
        TM: "تركمانستان",
        TN: "تونس",
        TO: "تونغا",
        TR: "تركيا",
        TT: "ترينيداد وتوباغو",
        TV: "توفالو",
        TW: "تايوان",
        TZ: "تنزانيا",
        UA: "أوكرانيا",
        UG: "أوغندا",
        UM: "جزر الولايات المتحدة النائية الصغرى",
        US: "الولايات المتحدة",
        UY: "الأوروغواي",
        UZ: "أوزبكستان",
        VA: "الفاتيكان",
        VC: "سانت فنسنت والغرينادين",
        VE: "فنزويلا",
        VG: "جزر فيرجن البريطانية",
        VI: "جزر فيرجن الأمريكية",
        VN: "فيتنام",
        VU: "فانواتو",
        WF: "واليس وفوتونا",
        WS: "ساموا",
        YE: "اليمن",
        YT: "مايوت",
        ZA: "جنوب أفريقيا",
        ZM: "زامبيا",
        ZW: "زيمبابوي",
      };

      return arabicCountryNames[country.iso2] || country.name;
    }

    return country[languageKey] || country.name;
  };

  const filteredCountries = countries.filter((country) => {
    const countryName = getCountryName(country);
    return (
      countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.phone[0].toString().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div
      className={`relative w-full h-[53px] px-4 py-7.5 hover:border-neutral-400 dark:hover:border-neutral-500 flex items-center gap-2 p-2 border-2 dark:border-neutral-700 rounded-xl focus-within:!border-neutral-700 dark:focus-within:!border-neutral-300 ${inputClassName} `}
      dir="ltr"
    >
      <img
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry.iso2}.svg`}
        alt={`${selectedCountry} flag`}
        draggable={false}
        width={24}
        height={16}
        className="mt-3"
      />
      <p className="text-[#2A32F8] text-sm font-normal -ml-1 mt-3" dir="ltr">
        +{selectedCountry.phone[0]}
      </p>
      <button
        disabled={disabled}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-3"
      >
        {isOpen ? (
          <ChevronUp size={14} className="text-[#2A32F8]" />
        ) : (
          <ChevronDown size={14} className="text-[#2A32F8]" />
        )}
      </button>
      {isOpen && (
        <div className="flex flex-col gap-2 border shadow-sm p-3 z-30 absolute rtl:right-0 ltr:left-0 top-11 max-h-[200px] min-w-full overflow-y-auto bg-white dark:bg-darkBg dark:text-neutral-200 rounded-[4px]">
          <Input
            disabled={disabled}
            placeholder={t("searchCountryOrPhoneCode")}
            variant="bordered"
            classNames={{ inputWrapper: "rounded-[8px]" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredCountries.map((country) => (
            <button
              onClick={() => {
                setSelectedCountry(country);
                setIsOpen(false);
              }}
              type="button"
              key={country.iso2}
              className="flex items-center gap-2 text-left text-xs"
            >
              <img
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso2}.svg`}
                alt={`${country} flag`}
                draggable={false}
                width={24}
                height={16}
              />
              <span>{getCountryName(country)}</span>
              <span>+{country.phone[0]}</span>
            </button>
          ))}
        </div>
      )}
      <input
        disabled={disabled}
        placeholder="123456789"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        dir="ltr"
        className="w-full bg-transparent dark:text-neutral-200 focus:outline-none py-2 mt-3"
        style={{ textAlign: "left" }}
      />
      <Label
        className={`text-[#000000] dark:text-neutral-200 text-[15px] !font-normal absolute top-0.5 rtl:right-4 ltr:left-4 ${labelClassName}`}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        {label || t("phone")}
      </Label>
    </div>
  );
};

export default MobileInput;
