import React from 'react'
import DashboardHeader from '../general/dashboard/DashboardHeader'
import SearchBar from '../general/dashboard/SearchBar'
import DashboardDatePicker from '../general/dashboard/DashboardDatePicker'
import DashboardButton from '../general/dashboard/DashboardButton'
import { Link } from 'react-router'

const NotificationsHeader = () => {
    return (
        <div className="pt-2 pb-6 bg-white ">
        <DashboardHeader
            titleAr="الاشعارات"
            titleEn="Notifications"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الاشعارات", titleEn: "Notifications" },
            ]}
        />

        <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
            <div className="flex-1">
                <SearchBar
                    termAr={"ابحث بالاسم"}
                    termEn={"Search by name"}
                    setTermAr={() => {}} 
                    setTermEn={() => {}} 
                />
            </div>
            <div className="flex-1">
            <DashboardDatePicker />
            </div>
            <Link to="/notifications/add">
            <DashboardButton titleAr={"اضافة اشعار جديد"} titleEn={"Add a new notification"} variant='add' />
            </Link>
        </div>
        </div>
    )
}

export default NotificationsHeader
