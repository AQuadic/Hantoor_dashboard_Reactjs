import DashboardHeader from "../general/dashboard/DashboardHeader";
import SearchBar from "../general/dashboard/SearchBar";
import DashboardDatePicker from "../general/dashboard/DashboardDatePicker";
import { Select, SelectItem, RangeValue } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { CalendarDate } from "@internationalized/date";
import { getAllCountries, Country } from "@/api/countries/getCountry";
import { useQuery } from "@tanstack/react-query";

interface SupportMessagesHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  dateRange: RangeValue<CalendarDate> | null;
  setDateRange: (range: RangeValue<CalendarDate> | null) => void;
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
}

const SupportMessagesHeader = ({
  searchTerm,
  setSearchTerm,
  dateRange,
  setDateRange,
  selectedCountry,
  setSelectedCountry,
}: SupportMessagesHeaderProps) => {
  const { t, i18n } = useTranslation("users");

const { data } = useQuery<Country[]>({
  queryKey: ["countries", searchTerm], 
  queryFn: ({ queryKey }) => {
    const [, search] = queryKey as [string, string?];
    return getAllCountries(search);
  },
});

  const countries: Country[] = Array.isArray(data) ? data : [];

  return (
    <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
      <DashboardHeader
        titleAr="رسائل الدعم"
        titleEn="Support messages"
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "رسائل الدعم", titleEn: "Support messages" },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
        <div className="flex-1">
          <SearchBar
            termAr={searchTerm}
            termEn={searchTerm}
            placeholderAr={t("searchByName")}
            setTermAr={setSearchTerm}
            setTermEn={setSearchTerm}
          />
        </div>
        <div className="flex-1">
          <DashboardDatePicker value={dateRange} onChange={setDateRange} />
        </div>
      </div>
      <div className="w-[160px] md:mx-8 mx-0 mt-2.5">
        <Select
          items={countries.map((c) => ({
            key: c.id.toString(),
            label: i18n.language === "ar" ? c.name.ar : c.name.en,
          }))}
          label={t("country")}
          placeholder={t("all")}
          selectedKeys={selectedCountry ? [selectedCountry] : []}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as string;
            setSelectedCountry(value || null);
          }}
          classNames={{
            trigger: "h-[46px] min-h-[46px] bg-white border !py-6",
            label: "text-sm text-gray-700",
            listbox: "bg-white shadow-md",
          }}
        >
          {(country) => (
            <SelectItem key={country.key}>{country.label}</SelectItem>
          )}
        </Select>
      </div>
    </div>
  );
};

export default SupportMessagesHeader;
