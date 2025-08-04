import { Input } from '@heroui/react'
import Add from '../icons/banks/Add'
import DashboardButton from '../general/dashboard/DashboardButton'
import { useTranslation } from 'react-i18next';
import MobileInput from '../general/MobileInput';
import { useState } from 'react';
import { countries } from "countries-list";

const getCountryByIso2 = (iso2: string) => {
  const country = countries[iso2 as keyof typeof countries];
  if (!country) return { iso2: "EG", name: "Egypt", phone: ["20"] };
  return {
    iso2,
    name: country.name,
    phone: [country.phone],
  };
};

const AddMaintenanceCenter = () => {
    const { t } = useTranslation("agents");
        const [selectedCountry, setSelectedCountry] = useState(
            getCountryByIso2("EG")
        );
        const [phone, setPhone] = useState("");
    return (
        <div className="bg-white mt-6 rounded-[15px] ">
        <div className="flex flex-col md:flex-row gap-[15px]">
            <div className="w-full">
            <Input
                label={t('arCenterName')}
                variant="bordered"
                placeholder={t('placeholderName')}
                classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
                size="lg"
            />
            </div>
                <div className="relative w-full">
                <MobileInput
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    phone={phone}
                    setPhone={setPhone}
                />
                <div className="absolute top-9 left-5"></div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-[15px] mt-4">
            <div className="w-full">
            <Input
                label={t('arAddress')}
                variant="bordered"
                placeholder={t('writeHere')}
                classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
                size="lg"
            />
            </div>
            <div className="w-full">
            <Input
                label={t('enAddress')}
                variant="bordered"
                placeholder={t('writeHere')}
                classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
                size="lg"
            />
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-[15px] mt-4">
            <div className="w-full">
            <Input
                label={t('linkGoogleMap')}
                variant="bordered"
                placeholder={t('writeHere')}
                classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
                size="lg"
            />
            </div>
            <div className="w-full">
            <Input
                label={t('phoneNumber')}
                variant="bordered"
                placeholder="123456789"
                classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
                size="lg"
            />
            </div>
        </div>

        <div className='mt-4 w-1/2'>
            <div className="w-full">
            <Input
                label={t('whatsApp')}
                variant="bordered"
                placeholder="123456789"
                classNames={{ label: "mb-2 text-[15px] !text-[#080808]" }}
                size="lg"
            />
            </div>
        </div>

        <div className='w-full h-[45px] border border-dashed border-[#D1D1D1] rounded-[12px] flex items-center justify-center gap-[10px] cursor-pointer mt-5'>
            <Add />
            <p className='text-[#2A32F8] text-base'>اضافة بيانات اخرى</p>
        </div>

        <div className="mt-6">
            <DashboardButton titleAr="حفظ" titleEn="Save" />
        </div>
        </div>
    )
}

export default AddMaintenanceCenter
