import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader'
import ImageInput from '@/components/general/ImageInput'
import { Input } from '@heroui/react';
import React from 'react'

const AddFeatures = () => {
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
            <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">الصورة</h3>
            <ImageInput image={profileImage} setImage={setProfileImage} />
        </div>
        <div className="p-8 bg-white rounded-2xl mt-[18px] mx-8">
            <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                {/* Arabic Question */}
                <div className="relative w-full">
                <Input
                    label="الوصف ( باللغة العربية )"
                    variant="bordered"
                    placeholder="تصفح السيارات الجديدة من مكانك"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    />
                </div>
                {/* English Question */}
                <div className="relative w-full">
                <Input
                    label="الوصف ( باللغة الانجليزية )"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                </div>
            </div>
            <div className="mt-5">
                <DashboardButton title="اضافة" />
            </div>
        </div> 
            
        </div>
    )
}

export default AddFeatures
