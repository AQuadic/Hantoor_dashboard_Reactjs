import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader'
import DashboardInput from '@/components/general/DashboardInput';
import ImageInput from '@/components/general/ImageInput'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const AddFeatures = () => {
    const { t } = useTranslation("setting");
    const [profileImage, setProfileImage] = React.useState<File | null>(null);
    const [arDescription, setArDescription] = useState("");
    const [enDescription, setEnDescription] = useState("");
    return (
        <div>
            <div className="pt-0 pb-2 bg-white ">
                <DashboardHeader
                    titleAr="اضافة مميزات جديدة"
                    titleEn="Add new features"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
                    { titleAr: "اضافة مميزات جديدة", titleEn: "Add new features" },
                    ]}
                />
        </div>
        <div className="p-8 bg-white rounded-2xl mt-[18px] mx-8">
            <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">{t('image')}</h3>
            <ImageInput image={profileImage} setImage={setProfileImage} placeholderText={t('addGIF')} />
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
                <DashboardButton titleAr="اضافة" titleEn="Add" />
            </div>
        </div> 
            
        </div>
    )
}

export default AddFeatures
