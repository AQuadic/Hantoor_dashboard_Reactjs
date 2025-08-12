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

  // Local state for instant input update
  const [inputValue, setInputValue] = React.useState(
    isArabic ? termAr : termEn
  );

  // Sync local state with parent value if language or parent value changes
  React.useEffect(() => {
    setInputValue(isArabic ? termAr : termEn);
  }, [isArabic, termAr, termEn]);

  // Debounce the search callback only
  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (isArabic) {
        setTermAr(inputValue);
      } else {
        setTermEn(inputValue);
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [inputValue, isArabic, setTermAr, setTermEn]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex items-center border rounded-full border-gray-300 px-6 py-2 bg-[#F3F6F9]">
      <SearchIcon />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border-none outline-none ltr:ml-3 rtl:mr-3 text-[#606C7E]"
        value={inputValue}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
