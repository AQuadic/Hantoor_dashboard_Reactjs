import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router";
import DashboardButton from "../general/dashboard/DashboardButton";
import { useTranslation } from "react-i18next";
import { Country } from "@/api/countries/getCountry";

interface TermsHeaderProps {
  countries?: Country[] | null;
  selectedCountryId?: number | null;
  onCountryChange?: (id: number | null) => void;
}

const TermsHeader = ({
  countries,
  selectedCountryId,
  onCountryChange,
}: TermsHeaderProps) => {
  const { i18n } = useTranslation("setting");
  const isRTL = i18n.language === "ar";

  return (
    <div className="flex items-center justify-between">
      <div className="w-full">
        <Select
          value={selectedCountryId === null ? "all" : String(selectedCountryId)}
          onValueChange={(val) => {
            if (val === "all") {
              onCountryChange?.(null);
              return;
            }
            const id = val ? Number(val) : null;
            onCountryChange?.(id);
          }}
        >
          <SelectTrigger
            className="w-[160px] !h-[53px] rounded-[12px] mt-4 bg-white"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <SelectValue placeholder={isRTL ? "البلد" : "Country"} />
          </SelectTrigger>
          <SelectContent dir={isRTL ? "rtl" : "ltr"}>
            {/* Always include an 'All' option which maps to null */}
            <SelectItem value="all">{isRTL ? "الجميع" : "All"}</SelectItem>
            {countries && countries.length > 0
              ? countries.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {isRTL ? c.name.ar || c.name.en : c.name.en || c.name.ar}
                  </SelectItem>
                ))
              : null}
          </SelectContent>
        </Select>
      </div>
      <Link to="/setting/add-terms">
        <DashboardButton
          titleAr={"اضافة شروط واحكام جديدة"}
          titleEn="Add new terms and conditions"
          variant="add"
        />
      </Link>
    </div>
  );
};

export default TermsHeader;
