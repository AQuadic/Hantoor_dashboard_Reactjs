import { DashboardStatus } from '@/constants/DashboardStatus'
import React from 'react'

const Status = () => {
  return (
    <section className='mt-[14px] grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-[11px] px-[33px]'>
        {DashboardStatus.map((item,index) => {
          return (
            <div key={index} className='h-full bg-[#FFFFFF] rounded-[15px] flex flex-col justify-center p-4'>
                <img src={item.icon} alt="User icon" className='w-[45px] h-[45px]' />
                <h2 className='text-[#000000] text-2xl font-bold mt-1'>{item.count}</h2>
                <p className='text-[#64748B] text-sm font-normal'>{item.text}</p>
            </div>
          )
        })}
    </section>
  )
}

export default Status
