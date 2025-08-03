import { Checkbox, Select, SelectItem} from "@heroui/react";
import { useTranslation } from "react-i18next";

const CarsSelect = () => {
    const { t } = useTranslation("cars");
    const countries = [
    {key: "1", label: "مصر"},
    {key: "2", label: "مصر"},
    {key: "3", label: "مصر"},
    {key: "4", label: "مصر"},
    {key: "5", label: "مصر"},
    {key: "6", label: "مصر"},
    ];
    return (
        <div className='mt-[11px] flex flex-wrap items-center gap-[5px] px-8'>
            <div className="w-[160px]">
                <Select
                    items={countries}
                    label={t('brand')}
                    placeholder={t('all')}
                    classNames={{
                        trigger: 'h-[46px] !h-[46px] min-h-[46px] bg-white border py-0',
                        label: 'text-sm text-gray-700',
                        listbox: 'bg-white shadow-md',
                    }}
                    >
                    {(country) => <SelectItem>{country.label}</SelectItem>}
                </Select>
            </div>

            <div className="w-[160px]">
                <Select
                    items={countries}
                    label={t('type')}
                    placeholder={t('all')}
                    classNames={{
                        trigger: 'h-[46px] !h-[46px] min-h-[46px] bg-white border py-0',
                        label: 'text-sm text-gray-700',
                        listbox: 'bg-white shadow-md',
                    }}
                    >
                    {(country) => <SelectItem>{country.label}</SelectItem>}
                </Select>
            </div>

            <div className="w-[160px]">
                <Select
                    items={countries}
                    label={t('model')}
                    placeholder={t('all')}
                    classNames={{
                        trigger: 'h-[46px] !h-[46px] min-h-[46px] bg-white border py-0',
                        label: 'text-sm text-gray-700',
                        listbox: 'bg-white shadow-md',
                    }}
                    >
                    {(country) => <SelectItem>{country.label}</SelectItem>}
                </Select>
            </div>

            <div className="md:w-[340px] w-full h-[46px] border border-[#DBDEE1] rounded-[34px] flex items-center justify-around">
                <div className="flex items-center">
                    <Checkbox defaultSelected size="md"></Checkbox>
                    <p className="text-[#1E1B1B] md:text-base text-sm font-normal">{t('containDiscount')}</p>
                </div>
                <div className="flex items-center">
                    <Checkbox defaultSelected size="md"></Checkbox>
                    <p className="text-[#1E1B1B] md:text-base text-sm font-normal">{t('containOffers')}</p>
                </div>
            </div>
    </div>
    )
}

export default CarsSelect
