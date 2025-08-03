import DashboardButton from '@/components/general/dashboard/DashboardButton'
import ImageInput from '@/components/general/ImageInput'
import MobileInput from '@/components/general/MobileInput';
import { Input } from '@heroui/react'
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

const AddBank = () => {
    const { t } = useTranslation("financing");
    const [selectedCountry, setSelectedCountry] = useState(
        getCountryByIso2("EG")
    );
    const [phone, setPhone] = useState("");
    const [profileImage, setProfileImage] = useState<File | null>(null);


    return (
        <section>
            <div className="pt-2 pb-6 bg-white ">
                <DashboardHeader
                    titleAr="اضافة بنك جديد"
                    titleEn="Add bank"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "الوكلاء", titleEn: "Agents", link: "/" },
                    { titleAr: "البنوك", titleEn: "Banks", link: "/" },
                    { titleAr: "اضافة بنك جديد", titleEn: "Add bank" },
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
                    <Input
                        label={t('arbankName')}
                        variant="bordered"
                        placeholder={t('bankName')}
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                        />
                    </div>
                    {/* English bank */}
                    <div className="relative w-full">
                    <Input
                        label={t('enbankName')}
                        variant="bordered"
                        placeholder={t('writeHere')}
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                    />
                    </div>
                </div>
                <MobileInput
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    phone={phone}
                    setPhone={setPhone}
                />
            </div>
            <div className="flex flex-wrap gap-6 p-8 mt-8 bg-white rounded-2xl !text-base">
                <div>
                    <div className="flex flex-col flex-1 gap-4">
                    <h3 className=" text-lg font-bold text-[#2A32F8]">{t('visitorData')}</h3>
                    <h2 className="text-[15px] font-bold text-[#1E1B1B]">{t('salaryRang')}</h2>
                    <div className='flex items-center gap-[9px]'>
                        <Input
                            label={t('salaryFrom')}
                            variant="bordered"
                            placeholder="5000 درهم"
                            classNames={{ label: "mb-2 text-base" }}
                            size="lg"
                        />
                        <Input
                            label={t('salaryTo')}
                            variant="bordered"
                            placeholder="5000 درهم"
                            classNames={{ label: "mb-2 text-base" }}
                            size="lg"
                        />
                    </div>
                    <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                        <p className="text-right text-black text-sm">{t('duration')}</p>
                        <div className="flex items-center justify-between gap-1">
                            <span className="text-gray-500 text-sm">3</span>
                            <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                            <option value="شهر">{t('month')}</option>
                            <option value="أيام">{t('day')}</option>
                            <option value="سنوات">{t('years')}</option>
                            </select>
                        </div>
                    </div>
                        <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                        <p className="text-right text-black text-sm">{t('Workplace')}</p>
                        <div className="flex items-center justify-between gap-1">
                            <span className="text-gray-500 text-sm">{t('GovernmentEntity')}</span>
                            <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                            <option value="1">{t('GovernmentEntity')}</option>
                            <option value="2">{t('GovernmentEntity')}</option>
                            <option value="3">{t('GovernmentEntity')}</option>
                            </select>
                        </div>
                    </div>
                    <Input
                        label={t('InterestAmount')}
                        variant="bordered"
                        placeholder="5%"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
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
                        <Input
                            label={t('salaryFrom')}
                            variant="bordered"
                            placeholder="5000 درهم"
                            classNames={{ label: "mb-2 text-base" }}
                            size="lg"
                        />
                        <Input
                            label={t('salaryTo')}
                            variant="bordered"
                            placeholder="5000 درهم"
                            classNames={{ label: "mb-2 text-base" }}
                            size="lg"
                        />
                    </div>
                    <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                        <p className="text-right text-black text-sm">{t('duration')}</p>
                        <div className="flex items-center justify-between gap-1">
                            <span className="text-gray-500 text-sm">3</span>
                            <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                            <option value="شهر">{t('month')}</option>
                            <option value="أيام">{t('day')}</option>
                            <option value="سنوات">{t('year')}</option>
                            </select>
                        </div>
                    </div>
                        <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                        <p className="text-right text-black text-sm">{t('Workplace')}</p>
                        <div className="flex items-center justify-between gap-1">
                            <span className="text-gray-500 text-sm">{t('GovernmentEntity')}</span>
                            <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                            <option value="1">{t('GovernmentEntity')}</option>
                            <option value="2">{t('GovernmentEntity')}</option>
                            <option value="3">{t('GovernmentEntity')}</option>
                            </select>
                        </div>
                    </div>
                    <Input
                        label={t('InterestAmount')}
                        variant="bordered"
                        placeholder="5%"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
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
                    <Input
                        label={t('salaryFrom')}
                        variant="bordered"
                        placeholder="5000 درهم"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                    />
                    <Input
                        label="المرتب الى"
                        variant="bordered"
                        placeholder="5000 درهم"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                    />
                </div>
                <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                    <p className="text-right text-black text-sm">{t('duration')}</p>
                    <div className="flex items-center justify-between gap-1">
                        <span className="text-gray-500 text-sm">3</span>
                        <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                        <option value="شهر">{t('month')}</option>
                        <option value="أيام">{t('day')}</option>
                        <option value="سنوات">{t('year')}</option>
                        </select>
                    </div>
                </div>
                    <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                    <p className="text-right text-black text-sm">{t('Workplace')}</p>
                    <div className="flex items-center justify-between gap-1">
                        <span className="text-gray-500 text-sm">{t('GovernmentEntity')}</span>
                        <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                        <option value="1">{t('GovernmentEntity')}</option>
                        <option value="2">{t('GovernmentEntity')}</option>
                        <option value="3">{t('GovernmentEntity')}</option>
                        </select>
                    </div>
                </div>
                <Input
                    label={t('InterestAmount')}
                    variant="bordered"
                    placeholder="5%"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
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

export default AddBank
