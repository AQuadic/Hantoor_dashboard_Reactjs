import DashboardButton from '@/components/general/dashboard/DashboardButton'
import ImageInput from '@/components/general/ImageInput'
import MobileInput from '@/components/general/MobileInput';
import DashboardInput from '@/components/general/DashboardInput';
import { Select, SelectItem } from "@heroui/react";
import React, { useState } from 'react'
import { countries } from "countries-list";
import Add from '@/components/icons/banks/Add';
import Delete from '@/components/icons/banks/Delete';
import { useTranslation } from 'react-i18next';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';

const getCountryByIso2 = (iso2: string) => {
  const country = countries[iso2 as keyof typeof countries];
  if (!country) return { iso2: "EG", name: "Egypt", phone: ["20"] };
  return {
    iso2,
    name: country.name,
    phone: [country.phone],
  };
};

const EditBank = () => {
    const { t } = useTranslation("financing");
    const [selectedCountry, setSelectedCountry] = useState(
        getCountryByIso2("EG")
    );
    const [phone, setPhone] = useState("");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    
    // Bank name states
    const [arBankName, setArBankName] = useState("");
    const [enBankName, setEnBankName] = useState("");
    
    // Visitor data states
    const [visitorSalaryFrom, setVisitorSalaryFrom] = useState("");
    const [visitorSalaryTo, setVisitorSalaryTo] = useState("");
    const [visitorInterestAmount, setVisitorInterestAmount] = useState("");
    
    // Second visitor data states (for duplicated section)
    const [visitorSalaryFrom2, setVisitorSalaryFrom2] = useState("");
    const [visitorSalaryTo2, setVisitorSalaryTo2] = useState("");
    const [visitorInterestAmount2, setVisitorInterestAmount2] = useState("");
    
    // Citizen data states
    const [citizenSalaryFrom, setCitizenSalaryFrom] = useState("");
    const [citizenSalaryTo, setCitizenSalaryTo] = useState("");
    const [citizenInterestAmount, setCitizenInterestAmount] = useState("");
    const authorities = [
        { key: "1", label: "1 سنة" },
        { key: "2", label: "سنتين" },
        { key: "3", label: "3 سنوات" },
        { key: "4", label: "4 سنوات" },
        { key: "4", label: "5 سنوات" },
    ];

    const entities = [
        { key: "1", label: "جهة حكومية" },
        { key: "2", label: "جهة خاصة" },
    ]

        const Workplaces = [
        { key: "1", label: "جهة حكومية" },
        { key: "2", label: "جهة خاصة" },
    ]

    return (
        <section>
            <div className="pt-0 pb-2 bg-white ">
                <DashboardHeader
                    titleAr="تعديل البنك"
                    titleEn="Edit bank"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "الوكلاء", titleEn: "Agents", link: "/" },
                    { titleAr: "البنوك", titleEn: "Banks", link: "/" },
                    { titleAr: "تعديل البنك", titleEn: "Edit bank" },
                    ]}
                />
            </div>
        <form className="p-8">
            <div className="p-8 bg-white rounded-2xl ">
                <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">{t('bankLogo')}</h3>
                <ImageInput image={profileImage} setImage={setProfileImage} />
                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                    {/* Arabic bank */}
                    <div className="relative w-full">
                    <DashboardInput
                        label={t('arbankName')}
                        value={arBankName}
                        onChange={setArBankName}
                        placeholder={t('bankName')}
                    />
                    </div>
                    {/* English bank */}
                    <div className="relative w-full">
                    <DashboardInput
                        label={t('enbankName')}
                        value={enBankName}
                        onChange={setEnBankName}
                        placeholder={t('writeHere')}
                    />
                    </div>
                </div>
                <div className='mt-[15px]'>
                    <MobileInput
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    phone={phone}
                    setPhone={setPhone}
                />
                </div>
            </div>
            <div className="flex flex-wrap gap-6 p-8 mt-8 bg-white rounded-2xl !text-base">
                <div>
                    <div className="flex flex-col flex-1 gap-4">
                    <h3 className=" text-lg font-bold text-[#2A32F8]">{t('visitorData')}</h3>
                    <h2 className="text-[15px] font-bold text-[#1E1B1B]">{t('salaryRang')}</h2>
                    <div className='flex items-center gap-[9px]'>
                        <DashboardInput
                            label={t('salaryFrom')}
                            value={visitorSalaryFrom}
                            onChange={setVisitorSalaryFrom}
                            placeholder="5000 درهم"
                        />
                        <DashboardInput
                            label={t('salaryTo')}
                            value={visitorSalaryTo}
                            onChange={setVisitorSalaryTo}
                            placeholder="5000 درهم"
                        />
                    </div>
                    <Select
                        label={t('duration')}
                        variant="bordered"
                        placeholder="1 سنة"
                        classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                        size="lg"
                        >
                        {authorities.map((authority) => (
                            <SelectItem key={authority.key} textValue={authority.label}>
                            {authority.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        label={t('Workplace')}
                        variant="bordered"
                        placeholder="جهة حكومية"
                        classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                        size="lg"
                        >
                        {entities.map((entitiy) => (
                            <SelectItem key={entitiy.key} textValue={entitiy.label}>
                            {entitiy.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <DashboardInput
                        label={t('InterestAmount')}
                        value={visitorInterestAmount}
                        onChange={setVisitorInterestAmount}
                        placeholder="5%"
                    />
                    </div>
                    <hr className='my-4'/>
                    <div className="flex flex-col flex-1 gap-4">
                    <div className='flex items-center justify-between'>
                        <div>
                            <h3 className=" text-lg font-bold text-[#2A32F8]"></h3>
                            <h2 className="text-[15px] font-bold text-[#1E1B1B] mt-2">{t('salaryRang')}</h2>
                        </div>
                    <Delete />
                    </div>
                    <div className='flex items-center gap-[9px]'>
                        <DashboardInput
                            label={t('salaryFrom')}
                            value={visitorSalaryFrom2}
                            onChange={setVisitorSalaryFrom2}
                            placeholder="5000 درهم"
                        />
                        <DashboardInput
                            label={t('salaryTo')}
                            value={visitorSalaryTo2}
                            onChange={setVisitorSalaryTo2}
                            placeholder="5000 درهم"
                        />
                    </div>
                    <Select
                        label={t('duration')}
                        variant="bordered"
                        placeholder="1 سنة"
                        classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                        size="lg"
                        >
                        {authorities.map((authority) => (
                            <SelectItem key={authority.key} textValue={authority.label}>
                            {authority.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        label={t('Workplace')}
                        variant="bordered"
                        placeholder="جهة حكومية"
                        classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                        size="lg"
                        >
                        {Workplaces.map((workplace) => (
                            <SelectItem key={workplace.key} textValue={workplace.label}>
                            {workplace.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <DashboardInput
                        label={t('InterestAmount')}
                        value={visitorInterestAmount2}
                        onChange={setVisitorInterestAmount2}
                        placeholder="5%"
                    />

                    <div className='w-full h-[45px] border border-dashed border-[#D1D1D1] rounded-[12px] flex items-center justify-center gap-[10px] cursor-pointer'>
                        <Add />
                        <p className='text-[#2A32F8] text-base'>{t('addMoreData')}</p>
                        </div>
                        <DashboardButton titleAr="اضافة" titleEn="Add" />
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-4">
                <h3 className=" text-lg font-bold text-[#2A32F8]">{t('citizenData')}</h3>
                <h2 className="text-[15px] font-bold text-[#1E1B1B]">{t('salaryRang')}</h2>
                <div className='flex items-center gap-[9px]'>
                    <DashboardInput
                        label={t('salaryFrom')}
                        value={citizenSalaryFrom}
                        onChange={setCitizenSalaryFrom}
                        placeholder="5000 درهم"
                    />
                    <DashboardInput
                        label="المرتب الى"
                        value={citizenSalaryTo}
                        onChange={setCitizenSalaryTo}
                        placeholder="5000 درهم"
                    />
                </div>
                    <Select
                        label={t('duration')}
                        variant="bordered"
                        placeholder="1 سنة"
                        classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                        size="lg"
                        >
                        {authorities.map((authority) => (
                            <SelectItem key={authority.key} textValue={authority.label}>
                            {authority.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        label={t('Workplace')}
                        variant="bordered"
                        placeholder="جهة حكومية"
                        classNames={{ label: "mb-2 text-base !text-[#080808]" }}
                        size="lg"
                        >
                        {Workplaces.map((workplace) => (
                            <SelectItem key={workplace.key} textValue={workplace.label}>
                            {workplace.label}
                            </SelectItem>
                        ))}
                    </Select>
                <DashboardInput
                    label={t('InterestAmount')}
                    value={citizenInterestAmount}
                    onChange={setCitizenInterestAmount}
                    placeholder="5%"
                />
                <div className='w-full h-[45px] border border-dashed border-[#D1D1D1] rounded-[12px] flex items-center justify-center gap-[10px] cursor-pointer'>
                    <Add />
                    <p className='text-[#2A32F8] text-base'>{t('addMoreData')}</p>
                </div>
                    <DashboardButton titleAr="اضافة" titleEn="Add" />
                </div>
            </div>
        </form>
        </section>
    )
}

export default EditBank
