import React, { useState, useMemo } from "react";

interface DebouncedSearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  debounceMs?: number;
}

export const DebouncedSearchInput: React.FC<DebouncedSearchInputProps> = ({
  placeholder = "Search...",
  onSearch,
  debounceMs = 400,
}) => {
  const [value, setValue] = useState("");

  useMemo(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, debounceMs);
    return () => clearTimeout(handler);
  }, [value, debounceMs, onSearch]);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="border rounded px-3 py-1 w-full mb-3"
      autoComplete="off"
    />
  );
};
