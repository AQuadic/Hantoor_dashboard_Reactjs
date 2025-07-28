import React from 'react'
import DashboardDatePicker from '../general/dashboard/DashboardDatePicker'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { day: "الامارات", cars: 50 },
  { day: "مصر", cars: 50 },
  { day: "السعودية", cars: 50 },
  { day: "قطر", cars: 50 },
  { day: "البحرين", cars: 50 },
  { day: "المغرب", cars: 50 },
  { day: "السعودية", cars: 50 },
  { day: "قطر", cars: 50 },
  { day: "الامارات", cars: 50 },
  { day: "مصر", cars: 50 },
  { day: "السعودية", cars: 50 },
  { day: "قطر", cars: 50 },
  { day: "مصر", cars: 50 },
]

const chartConfig = {
  cars: {
    label: "عدد السيارات",
    color: "#2A32F826",
  },
} satisfies ChartConfig

const DashboardChart = () => {
    return (
        <section className='h-auto bg-[#FFFFFF] py-4 px-7 mt-[15px] rounded-[15px] flex-1' dir="rtl">
            <div className='flex items-center justify-between mb-6'>
                <h2 className='text-[#000000] text-[23px] font-bold'>عدد السيارات</h2>
                <DashboardDatePicker />
            </div>
            
            <div className="mb-2">
                <div className="text-right text-sm text-gray-600 mb-1">العدد</div>
            </div>

            <ChartContainer config={chartConfig} className="min-h-[200px] w-full bg-[#F4F4FE] rounded-[10px]">
                <BarChart accessibilityLayer data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="blueGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#2A32F8" />
                            <stop offset="30%" stopColor="#2A32F8" />
                            <stop offset="30%" stopColor="#2A32F826" />
                            <stop offset="100%" stopColor="#2A32F826" />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        tickMargin={8}
                        axisLine={false}
                        tick={{ fontSize: 11, fill: '#6b7280' }}
                    />
                    <YAxis 
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10, fill: '#6b7280' }}
                        domain={[0, 'dataMax']}
                        tickCount={6}
                        width={30}
                    />
                    <ChartTooltip 
                        content={<ChartTooltipContent />}
                        // labelFormatter={(value) => `اليوم: ${value}`}
                    />
                    <Bar 
                        dataKey="cars" 
                        fill="url(#blueGradient)" 
                        radius={[8, 8, 8, 8]}
                        maxBarSize={12}
                    />
                </BarChart>
            </ChartContainer>
        </section>
    )
}

export default DashboardChart