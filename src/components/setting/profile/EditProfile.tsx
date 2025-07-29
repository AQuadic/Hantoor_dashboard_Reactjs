import React from 'react'
import ImageInput from '@/components/general/ImageInput'
import { Input } from '@heroui/react';
import DashboardButton from '@/components/general/dashboard/DashboardButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';

const EditProfile = () => {
    const [profileImage, setProfileImage] = React.useState<File | null>(null);
    
    return (
        <div>
            <div className="pt-2 pb-6 bg-white ">
                <DashboardHeader
                    titleAr="تعديل الصفحة التعريفية"
                    titleEn="Edit profile page"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
                    { titleAr: "تعديل الصفحة التعريفية", titleEn: "Edit profile page" },
                    ]}
                />
                </div>
            <div className='h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]'>
                <h2 className='text-[#2A32F8] text-[17px] font-bold mb-3'>صورة الصفحة التعريفية</h2>
                <ImageInput image={profileImage} setImage={setProfileImage} />
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
                    label="السؤال ( باللغة العربية )"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    />
                </div>
                {/* English Question */}
                <div className="relative w-full">
                <Input
                    label="السؤال ( باللغة الانجليزية )"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                </div>
            </div>
    
            <div className="mt-4">
                <DashboardButton title={"حفظ"} />
            </div>
            </div>
        </div>
    )
}

export default EditProfile