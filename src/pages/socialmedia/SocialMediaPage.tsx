import Facebook from '@/components/icons/socailmedia/Facebook'
import Instagram from '@/components/icons/socailmedia/Instagram'
import Linkedin from '@/components/icons/socailmedia/Linkedin'
import Snapchat from '@/components/icons/socailmedia/Snapchat'
import Tiktok from '@/components/icons/socailmedia/Tiktok'
import Whatsapp from '@/components/icons/socailmedia/Whatsapp'
import X from '@/components/icons/socailmedia/X'
import React from 'react'

const SocialMediaPage = () => {
    const SocialData = [
        {
            icon: Facebook,
            link: "رابط الفيسبوك",
        },
        {
            icon: Instagram,
            link: "رابط الانستجرام",
        },
        {
            icon: Whatsapp,
            link: "رابط واتساب",
        },
        {
            icon: Tiktok,
            link: "رابط التيك توك",
        },
        {
            icon: Snapchat,
            link: "رابط السناب شات",
        },
        {
            icon: X,
            link: "رابط اكس",
        },
        {
            icon: Linkedin,
            link: "رابط لينكدان",
        },
    ]
    return (
        <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
            <h2 className='text-[#2A32F8] text-[17px] font-bold'>روابط التواصل الاجتماعي</h2>
            <div className='mt-[14px] grid md:grid-cols-2 grid-cols-1 gap-4'>
                {SocialData.map((item,index) => (
                    <div key={index} className='w-full h-[57px] border border-[#E2E2E2] rounded-[12px] flex items-center gap-4 px-2.5'>
                    <div>
                        <item.icon />
                    </div>
                    <div>
                        <p className='text-[#000000] text-[15px] font-normal'>{item.link}</p>
                        <input type="text" placeholder='اكتب هنا' className='focus:outline-none' />
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default SocialMediaPage
