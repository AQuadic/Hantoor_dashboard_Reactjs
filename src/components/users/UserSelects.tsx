import { Select, SelectItem } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/api/countries/getCountry";

interface UserSelectsProps {
  countryId?: number;
  setCountryId: (val: number | undefined) => void;
}

const UserSelects = ({countryId, setCountryId }: UserSelectsProps) => {
    const { t, i18n } = useTranslation("users");

    const { data } = useQuery({
        queryKey: ["countries"],
        queryFn: () => getCountries(1),
    });

    const countries =
        data?.data.map((c) => ({
        key: String(c.id),
        label: i18n.language === "ar" ? c.name.ar : c.name.en,
        })) ?? [];
    return (
        <div className='mt-[11px] flex items-center gap-[5px] px-8'>
            <div className="w-[160px]">
                <Select
                    items={countries}
                    label={t('registerWay')}
                    placeholder={t('all')}
                    classNames={{
                        trigger: 'h-[46px] !h-[46px] min-h-[46px] bg-white border !py-6',
                        label: 'text-sm text-gray-700',
                        listbox: 'bg-white shadow-md',
                    }}
                    >
                    {(country) => <SelectItem>{country.label}</SelectItem>}
                </Select>
            </div>

            <div className="w-[160px]">
                <Select
                    items={[{ key: "all", label: t("all") }, ...countries]}
                    label={t('country')}
                    placeholder={t('all')}
                    selectedKeys={countryId ? [String(countryId)] : []}
                    onSelectionChange={(keys) => {
                        const key = Array.from(keys)[0] as string | undefined;
                        setCountryId(key && key !== "all" ? Number(key) : undefined);
                    }}
                    classNames={{
                        trigger: 'h-[46px] !h-[46px] min-h-[46px] bg-white border !py-6',
                        label: 'text-sm text-gray-700',
                        listbox: 'bg-white shadow-md',
                    }}
                    >
                    {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                </Select>
            </div>
    </div>
    )
}

export default UserSelects
