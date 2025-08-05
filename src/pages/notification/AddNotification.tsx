import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';
import ImageInput from '@/components/general/ImageInput';
import SuccessPopup from '@/components/general/SuccessPopup';
import { Checkbox, Input, Select, SelectItem } from "@heroui/react";
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const AddNotification = () => {
    const { t } = useTranslation("notifications");
    const [profileImage, setProfileImage] = React.useState<File | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const countries = [
        { key: "ae", label: "الامارات" },
        { key: "eg", label: "مصر" },
        { key: "ksa", label: "السعودية" },
    ];

    const reciever = [
        { key: "1", label: "الكل" },
        { key: "2", label: "الكل" },
        { key: "3", label: "الكل" },
    ];

    const data = [
        { name: "ابراهيم محمود", phone: "+966 123456 789" },
        { name: "مصطفي محمد", phone: "+966 123456 789" },
        { name: "Khaled Mohmed", phone: "+966 123456 789" },
        { name: "Dina Khaled", phone: "+966 123456 789" },
    ];

    const handleSend = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
    };


    return (
        <section className="relative">
            <div className="pt-0 pb-2 bg-white ">
                <DashboardHeader
                    titleAr="اضافة اشعار جديد"
                    titleEn="Add new notification"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "الاشعارات", titleEn: "Notifications", link: "/notifications" },
                    { titleAr: "اضافة اشعار جديد", titleEn: "Add new notification" },
                    ]}
                />
                <div className='px-8'>
                <ImageInput image={profileImage} setImage={setProfileImage} />
                </div>
            </div>
            
            <div className='flex xl:flex-row flex-col gap-[27px] mt-[11px] md:mx-8 mx-2'>
                <div className='xl:w-[838px] h-full bg-[#FFFFFF] rounded-[15px] py-6 px-5'>
                    <div className="flex xl:flex-row flex-col items-center gap-[15px] mt-4">
                        {/* Arabic Question */}
                        <div className="relative w-full">
                        <Input
                            label={t('arText')}
                            variant="bordered"
                            placeholder={t('writeHere')}
                            classNames={{ label: "mb-2 text-base" }}
                            size="lg"
                            />
                        </div>
                        {/* English Question */}
                        <div className="relative w-full">
                        <Input
                            label={t('enText')}
                            variant="bordered"
                            placeholder={t('writeHere')}
                            classNames={{ label: "mb-2 text-base" }}
                            size="lg"
                        />
                        </div>
                    </div>

                    <div className='flex xl:flex-row flex-col items-center gap-3 mt-4'>
                        <div className="relative w-full">
                            <textarea
                                id="arabic-description"
                                name="arabic-description"
                                placeholder={t('lorem')}
                                className="peer w-full h-[191px] rounded-[12px] border border-[#E2E2E2] p-4 pt-8 focus:outline-none"
                            />
                            <label
                                htmlFor="arabic-description"
                                className="absolute right-4 top-3 text-[#606C7E] text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-focus:top-3 peer-focus:text-sm peer-focus:text-[#606C7E]"
                            >
                                {t('arDescription')}
                            </label>
                        </div>
                        <div className="relative w-full">
                            <textarea
                                id="english-description"
                                name="english-description"
                                placeholder={t('lorem')}
                                className="peer w-full h-[191px] rounded-[12px] border border-[#E2E2E2] p-4 pt-8 focus:outline-none"
                            />
                            <label
                                htmlFor="english-description"
                                className="absolute right-4 top-3 text-[#606C7E] text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#000000] peer-focus:top-3 peer-focus:text-sm peer-focus:text-[#606C7E]"
                            >
                                {t('enDescription')}
                            </label>
                        </div>
                    </div>

                    <div className='flex xl:flex-row flex-col items-center gap-3 mt-3'>
                        <Select
                        label={t('country')}
                        variant="bordered"
                        placeholder={t('choose')}
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                        >
                        {countries.map((c) => (
                            <SelectItem key={c.key} textValue={c.label}>
                            {c.label}
                            </SelectItem>
                        ))}
                        </Select>
                        
                        <Select
                        label={t('selectReciver')}
                        variant="bordered"
                        placeholder={t('choose')}
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                        >
                        {reciever.map((authority) => (
                            <SelectItem key={authority.key} textValue={authority.label}>
                            {authority.label}
                            </SelectItem>
                        ))}
                        </Select>
                    </div>
                
                    <div className='mt-4'>
                        <DashboardButton titleAr='ارسال' titleEn='Send' onClick={handleSend}/>
                    </div>
                </div>

                <div className='xl:w-[506px] h-full bg-white rounded-[15px] p-[17px] xl:mt-0 mt-4'>
                    <div className="relative w-full mb-4">
                        <input
                            type="text"
                            placeholder="ابحث..."
                            className="bg-[#F3F6F9] w-full pl-4 pr-10 py-[10px] text-sm text-right placeholder-[#606C7E] border border-[#0000001A] rounded-[10px] focus:outline-none"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
                        </svg>
                        </div>

                    <table className='w-full table-auto border-separate border-spacing-y-2'>
                        <thead>
                        <tr className='bg-[#F0F4F7] h-9 rounded-[8px] text-right'>
                            <th className='w-[24px]'></th>
                            <th className='pr-2 text-[#2A32F8] text-sm font-bold'>{t('image')}</th>
                            <th className='pr-2 text-[#2A32F8] text-sm font-bold'>{t('name')}</th>
                            <th className='pr-2 text-[#2A32F8] text-sm font-bold'>{t('phone')}</th>
                        </tr>
                        </thead>

                        <tbody>
                        {data.map((item, index) => (
                            <tr
                            key={index}
                            className='bg-white border-b border-[#E3E8EF] text-sm text-right'
                            >
                            <td className='align-middle'>
                                <Checkbox defaultSelected></Checkbox>
                            </td>

                            <td className='py-3 pr-2'>
                                <img
                                src='/images/user.svg'
                                alt='user'
                                className='w-[52px] h-[51px] rounded-full'
                                />
                            </td>

                            <td className='py-3 pr-2 text-[#071739] font-normal'>{item.name}</td>

                            <td className='py-3 pr-2 text-[#606C7E]' dir='ltr'>{item.phone}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}

        </section>
    )
}

export default AddNotification
