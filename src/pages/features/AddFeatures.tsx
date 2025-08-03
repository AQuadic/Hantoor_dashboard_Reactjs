import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader'
import ImageInput from '@/components/general/ImageInput'
import { Input } from '@heroui/react';
import React from 'react'
import { useTranslation } from 'react-i18next';

const AddFeatures = () => {
    const { t } = useTranslation("setting");
    const [profileImage, setProfileImage] = React.useState<File | null>(null);
    return (
        <div>
            <div className="pt-2 pb-6 bg-white ">
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
                <Input
                    label={t('arDescription')}
                    variant="bordered"
                    placeholder={t('exploreNewCars')}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    />
                </div>
                {/* English Question */}
                <div className="relative w-full">
                <Input
                    label={t('enDescription')}
                    variant="bordered"
                    placeholder={t('writeHere')}
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
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
