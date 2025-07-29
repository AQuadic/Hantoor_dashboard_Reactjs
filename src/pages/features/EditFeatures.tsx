import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader'
import Delete from '@/components/icons/setting/Delete';
import { Input } from '@heroui/react';
import React from 'react'

const EditFeatures = () => {
    return (
        <div>
            <div className="pt-2 pb-6 bg-white ">
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
            <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">الصورة</h3>
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
                <DashboardButton title="حفظ" />
            </div>
        </div> 
            
        </div>
    )
}

export default EditFeatures
