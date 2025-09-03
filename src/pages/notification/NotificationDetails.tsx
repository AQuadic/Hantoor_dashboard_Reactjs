import DashboardHeader from '@/components/general/dashboard/DashboardHeader';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBroadcastNotification, BroadcastNotification } from '@/api/notifications/getNotificationById';
import Loading from '@/components/general/Loading';
import NoData from '@/components/general/NoData';

const NotificationDetails = () => {
  const { t, i18n } = useTranslation("notifications");
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery<BroadcastNotification>({
    queryKey: ["broadcast_notification", id],
    queryFn: () => getBroadcastNotification(id!),
    enabled: !!id,
  });

  if (isLoading) return <Loading />
  if (!data) return <NoData />

  const lang = i18n.language as "ar" | "en";
  const title = data.title[lang];
  const body = data.body[lang];

    return (
        <section>
            <div className="pt-0 pb-2 bg-white ">
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
                    <img src={data.image ?? "/images/carDetails.png"} alt="Notification" />
                    <h1 className='text-[#2A32F8] text-2xl font-bold mt-[13px]'>
                        {t('thecountry')} <span>{data.country_id}</span>
                    </h1>
                    <h1 className='text-[#071739] text-xl leading-6 font-bold mt-2.5'>{title}</h1>
                    <p className="text-[#071739] text-base font-normal mt-[11px] xl:w-[725px] w-full">{body}</p>
                    <hr className='my-4'/>
                    <div className='text-left'>
                        <h2 className='text-[#071739] text-xl font-bold'>Data protection</h2>
                        <p className='text-[#071739] text-base font-normal mt-4'>
                        Lorem ipsum is placeholder text commonly used...
                        </p>
                    </div>
                </div>
                <div className='xl:w-[506px] w-full h-full bg-[#FFFFFF] rounded-[15px] p-[17px]'>
                <h1 className='text-[#2A32F8] text-xl font-bold'>{t('clients')}</h1>
                {data.users.length > 0 ? (
                    data.users.map((user, index) => (
                    <div key={index} className="mt-2">
                        <div className="flex items-center gap-2.5">
                        <img src="/images/user.svg" alt="" />
                        <div>
                            <h2 className="text-[#071739] text-base font-normal">{user.name}</h2>
                            <p className="text-[#606C7E] text-sm font-normal mt-2" dir="ltr">
                            {user.phone}
                            </p>
                        </div>
                        </div>
                        {index !== data.users.length - 1 && <div className="mt-4 border-b border-[#E3E8EF]" />}
                    </div>
                    ))
                ) : (
                    <p className="text-[#606C7E] text-sm mt-2">{t('noClients')}</p>
                )}
                </div>
            </div>
        </section>
    )
}

export default NotificationDetails
