import { Country, getAllCountries } from "@/api/countries/getCountry";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import { Select, SelectItem } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

interface SupportMessagesHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
}

const InsuranceHeader = ({
  searchTerm,
  selectedCountry,
  setSelectedCountry,
}: SupportMessagesHeaderProps) => {
  const { t, i18n } = useTranslation("setting");

  const { data } = useQuery<Country[]>({
    queryKey: ["countries", searchTerm], 
    queryFn: ({ queryKey }) => {
      const [, search] = queryKey as [string, string?];
      return getAllCountries(search);
    },
  });
  const countries: Country[] = Array.isArray(data) ? data : [];

    return (
        <div className="flex items-center justify-between">
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
            <Link to='/setting/add-whatsapp'>
                <DashboardButton titleAr={'اضافة رقم واتساب جديد'} titleEn="Add a new whatsapp number" variant="add" />
            </Link>
        </div>
    )
}

export default InsuranceHeader
