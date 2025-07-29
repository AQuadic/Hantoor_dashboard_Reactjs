import SearchIcon from "@/components/icons/dashboard/SearchIcon";
import React from "react";

interface SearchBarProps {
  term: string;
  setTerm: (term: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  term,
  setTerm,
  placeholder = "Search...",
}) => {
  return (
    <div className="flex items-center border rounded-full border-gray-300 px-6 py-2 bg-[#F3F6F9] ">
      <SearchIcon />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border-none outline-none ltr:ml-3 rtl:mr-3"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
