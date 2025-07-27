import React from 'react'
import DashboardHeader from '../general/dashboard/DashboardHeader'
import SearchBar from '../general/dashboard/SearchBar'
import DashboardDatePicker from '../general/dashboard/DashboardDatePicker'
import DashboardButton from '../general/dashboard/DashboardButton'
import { Link } from 'react-router'

const FAQsHeader = () => {
  return (
        <div className="pt-2 pb-6 bg-white ">
        <DashboardHeader
            titleAr="الاسئلة الشائعة"
            titleEn="Frequently asked questions"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الاسئلة الشائعة", titleEn: "Frequently asked questions" },
            ]}
        />

        <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
            <div className="flex-1">
            <SearchBar term={""} setTerm={() => {}} />
            </div>
            <div className="flex-1">
            <DashboardDatePicker />
            </div>
            <Link to="/faq/add">
            <DashboardButton title={"اضافة بلد جديدة"} variant="add" />
            </Link>
        </div>
        </div>
  )
}

export default FAQsHeader
