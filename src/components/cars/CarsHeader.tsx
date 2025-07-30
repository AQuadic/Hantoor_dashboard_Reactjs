import React from 'react'
import DashboardHeader from '../general/dashboard/DashboardHeader'
import SearchBar from '../general/dashboard/SearchBar'
import DashboardDatePicker from '../general/dashboard/DashboardDatePicker'
import { Link } from 'react-router'
import DashboardButton from '../general/dashboard/DashboardButton'
import CarsSelect from './CarsSelect'

const CarsHeader = () => {
    return (
        <div className="pt-2 pb-6 bg-white ">
        <DashboardHeader
            titleAr="السيارات"
            titleEn="Cars"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "السيارات", titleEn: "Cars" },
            ]}
        />

        <div className="flex flex-wrap items-center gap-2 px-2 md:px-8">
            <div className="flex-1">
            <SearchBar term={"ابحث بالاسم"} setTerm={() => {}} />
            </div>
            <div className="flex-1">
            <DashboardDatePicker />
            </div>
            <Link to="/cars/add">
                <DashboardButton title={"اضافة سيارة جديدة"} variant="add" />
            </Link>
        </div>
        <CarsSelect />
        </div>
    )
}

export default CarsHeader
