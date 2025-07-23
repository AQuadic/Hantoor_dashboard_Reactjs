import { SidebarLinks } from '@/constants/SidebarLinks'
import React from 'react'

const DashboardSidebar = () => {
    return (
        <section>
            <img src='/images/dashboard/dashboardLogo.svg' alt='logo' className='py-8 px-8' />
            <div className='bg-white w-[288px] py-4'>
                {SidebarLinks.map((link,index) => {
                return (
                    <div key={index} className='flex items-center gap-[5px] mt-4'>
                        <link.icons />
                        <h1 className='text-[#606060] text-[15px] font-normal'>{link.link}</h1>
                    </div>
                )
            })}
            </div>
        </section>
    )
}

export default DashboardSidebar
