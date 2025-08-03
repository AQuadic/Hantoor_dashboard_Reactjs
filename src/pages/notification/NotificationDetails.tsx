import DashboardHeader from '@/components/general/dashboard/DashboardHeader'
import React from 'react'
import { useTranslation } from 'react-i18next';

const NotificationDetails = () => {
    const { t } = useTranslation("notifications");
    const data = [
        { name: "ابراهيم محمود", phone: "+966 123456 789" },
        { name: "مصطفي محمد", phone: "+966 123456 789" },
        { name: "Khaled Mohmed", phone: "+966 123456 789" },
        { name: "Dina Khaled", phone: "+966 123456 789" }
    ];
    return (
        <section>
            <div className="pt-2 pb-6 bg-white ">
                <DashboardHeader
                    titleAr="تفاصيل الاشعار"
                    titleEn="Notification details"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "الاشعارات", titleEn: "Notifications", link: "/notifications" },
                    { titleAr: "تفاصيل الاشعار", titleEn: "Notification details" },
                    ]}
                />
            </div>
            
            <div className='md:px-8 px-2 mt-1 flex xl:flex-row flex-col gap-[33px]'>
                <div className='flex-1'>
                    <img src="/images/carDetails.png" alt="Car" />
                    <h1 className='text-[#2A32F8] text-2xl font-bold mt-[13px]'>
                        {t('thecountry')} <span>{t('UAE')}</span>
                    </h1>
                    <h1 className='text-[#071739] text-xl leading-6 font-bold mt-2.5'>حماية البيانات</h1>
                    <p className='text-[#071739] text-base font-normal mt-[11px] xl:w-[725px] w-full'>أي معلومات شخصية تزودنا بها عند استخدامك لهذا الموقع سوف تعامل وفقاً لسياسة الخصوصية الموجودة لدينا والحفاظ عليها أي معلومات شخصية تزودنا بها عند استخدامك لهذا الموقع سوف تعامل وفقاً لسياسة الخصوصية الموجودة لدينا والحفاظ عليها.</p>
                    <hr className='my-4'/>
                    <div className='text-left'>
                        <h2 className='text-[#071739] text-xl font-bold'>Data protection</h2>
                        <p className='text-[#071739] text-base font-normal mt-4'>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups</p>
                    </div>
                </div>
                <div className='xl:w-[506px] w-full h-full bg-[#FFFFFF] rounded-[15px] p-[17px]'>
                    <h1 className='text-[#2A32F8] text-xl font-bold'>{t('clients')}</h1>
                    {data.map((item, index) => (
                        <div key={index} className='mt-2'>
                            <div className='flex items-center gap-2.5'>
                            <img src="/images/user.svg" alt="" />
                            <div>
                                <h2 className='text-[#071739] text-base font-normal'>{item.name}</h2>
                                <p className='text-[#606C7E] text-sm font-normal mt-2' dir='ltr'>{item.phone}</p>
                            </div>
                            </div>
                            
                            {index !== data.length - 1 && (
                            <div className="mt-4 border-b border-[#E3E8EF]" />
                            )}
                        </div>
                        ))}
                </div>
            </div>
        </section>
    )
}

export default NotificationDetails
