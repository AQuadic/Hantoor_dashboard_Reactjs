import React from 'react'
import { Input } from '@heroui/react';
import DashboardButton from '@/components/general/dashboard/DashboardButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';

const EditTerms = () => {
    
    return (
        <div>
            <div className="pt-2 pb-6 bg-white ">
                <DashboardHeader
                    titleAr="تعديل الشروط والاحكام"
                    titleEn="Edit terms and conditions"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
                    { titleAr: "تعديل الشروط والاحكام", titleEn: "Edit terms and conditions" },
                    ]}
                />
                </div>
                        <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                {/* Country */}
                <div className="md:w-1/2 w-full">
                <Select>
                    <SelectTrigger
                    className="w-full !h-16 rounded-[12px] mt-4"
                    dir="rtl"
                    >
                    <SelectValue placeholder="البلد" />
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                    <SelectItem value="1">الامارات</SelectItem>
                    <SelectItem value="2">الامارات</SelectItem>
                    <SelectItem value="3">الامارات</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>
            <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                {/* Arabic Question */}
                <div className="relative w-full">
                <Input
                    label="عنوان النص ( باللغة العربية )"
                    variant="bordered"
                    placeholder="سياسة الأسعار"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    />
                </div>
                {/* English Question */}
                <div className="relative w-full">
                <Input
                    label="عنوان النص ( باللغة الانجليزية )"
                    variant="bordered"
                    placeholder="price policy"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                </div>
            </div>
    
            <div className="mt-4">
                <DashboardButton titleAr="حفظ" titleEn="Save" />
            </div>
            </div>
        </div>
    )
}

export default EditTerms