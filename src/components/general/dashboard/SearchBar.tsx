import SearchIcon from "@/components/icons/dashboard/SearchIcon";
import React from "react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  termAr: string;
  termEn: string;
  setTermAr: (value: string) => void;
  setTermEn: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  termAr,
  termEn,
  setTermAr,
  setTermEn,
  placeholder = "Search...",
}) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const value = isArabic ? termAr : termEn;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isArabic) {
      setTermAr(val);
    } else {
      setTermEn(val);
    }
  };

  return (
    <div className="flex items-center border rounded-full border-gray-300 px-6 py-2 bg-[#F3F6F9]">
      <SearchIcon />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border-none outline-none ltr:ml-3 rtl:mr-3 text-[#606C7E]"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
