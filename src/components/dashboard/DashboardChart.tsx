import React from 'react'
import DashboardDatePicker from '../general/dashboard/DashboardDatePicker'

const DashboardChart = () => {
    return (
        <section className='h-44 bg-[#FFFFFF] py-4 px-7 mt-[15px] rounded-[15px] flex-1'>
            <div className='flex items-center justify-between'>
                <h2 className='text-[#000000] text-[23px] font-bold'>عدد السيارات</h2>
                <DashboardDatePicker />
            </div>
        </section>
    )
}

export default DashboardChart
