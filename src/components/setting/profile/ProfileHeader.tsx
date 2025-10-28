import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardButton from "../../general/dashboard/DashboardButton";
import { Link } from "react-router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCountries, Country } from "@/api/countries/getCountry";
import { useHasPermission } from "@/hooks/usePermissions";

interface Props {
  countryId: string;
  setCountryId: (id: string) => void;
}

const ProfileHeader = ({ countryId, setCountryId }: Props) => {
  const { data: countries = [], isLoading } = useQuery<Country[]>({
    queryKey: ["allCountries"],
    queryFn: () => getAllCountries(),
  });

  const canCreate = useHasPermission("create_onboarding");

  return (
    <div className="flex items-center justify-between">
      <div className="w-full">
        <Select
          onValueChange={(v) => setCountryId(v === "_all" ? "" : v)}
          value={countryId}
        >
          <SelectTrigger
            className="w-[160px] !h-[53px] rounded-[12px] mt-4 bg-white"
            dir="rtl"
          >
            <SelectValue placeholder="البلد" />
          </SelectTrigger>
          <SelectContent dir="rtl">
            <SelectItem value="_all">الجميع</SelectItem>
            {!isLoading &&
              countries.map((c: Country) => (
                <SelectItem key={c.id} value={c.id.toString()}>
                  {c.name.ar}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      {canCreate && (
        <Link to="/setting/add-onboarding">
          <DashboardButton
            titleAr={"اضافة صفحة تعريفية"}
            titleEn="Add a new onboarding page"
            variant="add"
          />
        </Link>
      )}
    </div>
  );
};

export default ProfileHeader;
