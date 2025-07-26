import { arabicCountryNames } from "@/constants/arabicCountryNames";
import { Input } from "@heroui/react";
import { getCountryDataList, ICountry, TCountryCode } from "countries-list";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface CountryWithCode extends ICountry {
  iso2: TCountryCode;
}

interface MobileInputProps {
  selectedCountry: CountryWithCode;
  setSelectedCountry: (country: CountryWithCode) => void;
  phone: string;
  setPhone: (value: string) => void;
  inputClassName?: string;
  disabled?: boolean;
}

const DashboardPhoneInput: React.FC<MobileInputProps> = ({
  selectedCountry,
  setSelectedCountry,
  phone,
  setPhone,
  inputClassName = "",
  disabled = false,
}) => {
  const { t, i18n } = useTranslation("profile");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const countries: CountryWithCode[] = useMemo(() => {
    const data = getCountryDataList();
    return Object.entries(data).map(([iso2, country]) => ({
      ...country,
      iso2: iso2 as TCountryCode,
    }));
  }, []);

  const getCountryName = (country: CountryWithCode): string => {
    const currentLanguage = i18n.language;
    const languageMap: Record<string, keyof ICountry> = {
      ar: "native",
      en: "name",
    };

    const languageKey = languageMap[currentLanguage] || "name";

    if (currentLanguage === "ar") {
      return arabicCountryNames[country.iso2 as keyof typeof arabicCountryNames] || country.name;
    }

    const value = country[languageKey] as string | string[] | number | undefined;
    if (typeof value === "string") {
      return value;
    } else if (Array.isArray(value)) {
      return value.join(", ");
    } else if (typeof value === "number") {
      return value.toString();
    }
    return country.name;
  };

  const filteredCountries = countries.filter((country) => {
    const name = getCountryName(country);
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.phone[0].toString().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div
      className={`relative w-full h-[50px] mt-3 hover:border-neutral-400 dark:hover:border-neutral-500 flex items-center gap-2.5 p-2 border-2 dark:border-neutral-700 rounded-[8px] focus-within:!border-neutral-700 dark:focus-within:!border-neutral-300 ${inputClassName}`}
    >
      <button
        disabled={disabled}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <img
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry.iso2}.svg`}
        alt={`${selectedCountry.name} flag`}
        draggable={false}
        width={24}
        height={16}
      />
      <p className="dark:text-neutral-200">+{selectedCountry.phone[0]}</p>
      <div className="bg-[#AAAAAA] w-[1px] h-5"></div>
      <input
        disabled={disabled}
        placeholder={t("phone") || ""}
        type="number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full bg-transparent dark:text-neutral-200 focus:outline-none rtl:text-right"
      />
      {isOpen && (
        <div className="flex flex-col gap-2 border shadow-sm p-3 z-30 absolute left-0 top-11 max-h-[200px] min-w-full overflow-y-auto bg-white dark:bg-darkBg dark:text-neutral-200 rounded-[4px]">
          <Input
            disabled={disabled}
            placeholder={t("searchCountryOrPhoneCode") || ""}
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
              className="flex items-center gap-2 text-left"
            >
              <img
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.iso2}.svg`}
                alt={`${country.name} flag`}
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
    </div>
  );
};

export default DashboardPhoneInput;
