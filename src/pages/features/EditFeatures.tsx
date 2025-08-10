import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader'
import DashboardInput from '@/components/general/DashboardInput';
import Delete from '@/components/icons/setting/Delete';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const EditFeatures = () => {
    const { t } = useTranslation("setting");
    const [arDescription, setArDescription] = useState("");
    const [enDescription, setEnDescription] = useState("");
    return (
        <div>
            <div className="pt-0 pb-2 bg-white ">
                <DashboardHeader
                    titleAr="تعديل المميزات"
                    titleEn="Edit features"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
                    { titleAr: "تعديل المميزات", titleEn: "Edit features" },
                    ]}
                />
        </div>
        <div className="p-8 bg-white rounded-2xl mt-[18px] mx-8">
            <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">{t('image')}</h3>
            <div className='relative w-[180px] h-[180px] border border-dashed rounded-[10px] flex items-center justify-center'>
                <img src="/images/editfeatures.svg" alt="" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Delete />
                </div>
            </div>
        </div>
        <div className="p-8 bg-white rounded-2xl mt-[18px] mx-8">
            <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                {/* Arabic Question */}
                <div className="relative w-full">
                <DashboardInput
                    label={t('arDescription')}
                    value={arDescription}
                    onChange={setArDescription}
                    placeholder={t('exploreNewCars')}
                    />
                </div>
                {/* English Question */}
                <div className="relative w-full">
                <DashboardInput
                    label={t('enDescription')}
                    value={enDescription}
                    onChange={setEnDescription}
                    placeholder={t('writeHere')}
                />
                </div>
            </div>
            <div className="mt-5">
                <DashboardButton titleAr="حفظ" titleEn="Save" />
            </div>
        </div> 
            
        </div>
    )
}

export default EditFeatures
