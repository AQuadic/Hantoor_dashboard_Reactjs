import { Input } from '@heroui/react'
import React from 'react'
import DashboardButton from '../general/dashboard/DashboardButton'
import ImageInput from '../general/ImageInput'
import {Textarea} from "@heroui/input";

const GeneralSettings = () => {
    const [profileImage, setProfileImage] = React.useState<File | null>(null);
    return (
        <section>
            {/* 1 */}
            <div className='h-full bg-[#FFFFFF] rounded-[15px] flex items-center mx-8 px-[29px] py-5'>
                <div className='lg:w-1/2'>
                    <Input
                    label="عدد الفيديوهات"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                <div className='mt-4'>
                    <DashboardButton titleAr="حفظ" titleEn="Save" />
                </div>
                </div>
            </div>

            {/* 2 */}
            <div className='h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]'>
                <h2 className='text-[#2A32F8] text-[17px] font-bold mb-3'>صورة صفحة اختيار اللغة والبلد</h2>
                <ImageInput image={profileImage} setImage={setProfileImage} />
            </div> 

            {/* 3 */}
            <div className='h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]'>
                <h2 className='text-[#2A32F8] text-[17px] font-bold mb-3'>نص مميزات التطبيق في الرئيسية</h2>
                <div className='flex md:flex-row flex-col items-center gap-[15px]'>
                    <div className='w-full'>
                        <Textarea className="mb-3" label="النص ( باللغة العربية )" placeholder="اكتب هنا" style={{ backgroundColor: '#f0f0f0' }}  />
                        <DashboardButton titleAr="حفظ" titleEn="Save" />
                    </div>
                    <div className='w-full'>
                        <Textarea className="mb-3" label="النص ( باللغة الانجليزية )" placeholder="اكتب هنا" />
                        <DashboardButton titleAr="حفظ" titleEn="Save" />
                    </div>
                </div>
            </div>

            {/* 4 */}
            <div className='h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]'>
                <h2 className='text-[#2A32F8] text-[17px] font-bold mb-3'>نص البحث المتقدم في الصفحة الرئيسية</h2>
                <div className='flex md:flex-row flex-col items-center gap-[15px]'>
                    <div className='w-full'>
                        <Textarea className="mb-3" label="النص ( باللغة العربية )" placeholder="اكتب هنا" />
                        <DashboardButton titleAr="حفظ" titleEn="Save" />
                    </div>
                    <div className='w-full'>
                        <Textarea className="mb-3" label="النص ( باللغة الانجليزية )" placeholder="اكتب هنا" />
                        <DashboardButton titleAr="حفظ" titleEn="Save" />
                    </div>
                </div>
            </div> 

            {/* 5 */}
            <div className='h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]'>
                <h2 className='text-[#2A32F8] text-[17px] font-bold mb-3'>نص التمويل في صفحة تفاصيل السيارة</h2>
                <div className='flex md:flex-row flex-col items-center gap-[15px]'>
                    <div className='w-full'>
                        <Textarea className="mb-3" label="النص ( باللغة العربية )" placeholder="اكتب هنا" />
                        <DashboardButton titleAr="حفظ" titleEn="Save" />
                    </div>
                    <div className='w-full'>
                        <Textarea className="mb-3" label="النص ( باللغة الانجليزية )" placeholder="اكتب هنا" />
                        <DashboardButton titleAr="حفظ" titleEn="Save" />
                    </div>
                </div>
            </div>

            {/* 6 */}
            <div className='h-full bg-[#FFFFFF] rounded-[15px] mx-8 px-[29px] py-5 mt-[11px]'>
                <h2 className='text-[#2A32F8] text-[17px] font-bold mb-3'>روابط التطبيق</h2>
                <div className='mt-2.5 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                    <Input
                    label="لينك التطبيق للاندرويد"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                <Input
                    label="إصدار التطبيق للاندرويد"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                <Input
                    type="date"
                    label="تاريخ نشر التطبيق للاندرويد"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                <Input
                    label="لينك التطبيق للاي فون"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                <Input
                    label="إصدار التطبيق للاي فون"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                <Input
                    type="date"
                    label="تاريخ نشر التطبيق للاي فون"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base"}}
                    size="lg"
                />
                </div>
            </div>
        </section>
    )
}

export default GeneralSettings
