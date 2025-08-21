"use client";
import Facebook from '@/components/icons/socailmedia/Facebook'
import Instagram from '@/components/icons/socailmedia/Instagram'
import Linkedin from '@/components/icons/socailmedia/Linkedin'
import Snapchat from '@/components/icons/socailmedia/Snapchat'
import Tiktok from '@/components/icons/socailmedia/Tiktok'
import Whatsapp from '@/components/icons/socailmedia/Whatsapp'
import X from '@/components/icons/socailmedia/X'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { getSocials } from '@/api/setting/social/getSocial';
import Loading from '@/components/general/Loading';

const SocialMediaPage = () => {
    const { t } = useTranslation("setting");

    const { data, isLoading } = useQuery({
        queryKey: ["socials"],
        queryFn: () => getSocials(1),
    });

    if (isLoading) {
        return <Loading />;
    }

    const SocialData = [
        {
            icon: Facebook,
            label: t("facebookLink"),
            value: data?.data.facebook 
        },
        {
            icon: Instagram,
            label: t("instagramLink"),
            value: data?.data.instagram 
        },
        {
            icon: Whatsapp,
            label: t("whatsappLink"),
            value: data?.data.whatsapp 
        },
        {
            icon: Tiktok,
            label: t("tiktokLink"),
            value: data?.data.tiktok 
        },
        {
            icon: Snapchat,
            label: t("snapchatLink"),
            value: data?.data.snapchat 
        },
        {
            icon: X,
            label: t("xLink"),
            value: data?.data.twitter 
        },
        {
            icon: Linkedin,
            label: t("linkedinLink"),
            value: data?.data.linkedin 
        },
    ];

    return (
        <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
            <h2 className='text-[#2A32F8] text-[17px] font-bold'>{t('socialMediaLinks')}</h2>
            <div className='mt-[14px] grid md:grid-cols-2 grid-cols-1 gap-4'>
                {SocialData.map((item, index) => (
                    <div key={index} className='w-full h-[57px] border border-[#E2E2E2] rounded-[12px] flex items-center gap-4 px-2.5'>
                    <div>
                        <item.icon />
                    </div>
                    <div>
                        <p className='text-[#000000] text-[15px] font-normal'>{item.label}</p>
                        <a
                        href={item.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline break-all"
                        >
                        {item.value}
                        </a>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default SocialMediaPage;
