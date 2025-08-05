import React from 'react'
import DashboardHeader from '../general/dashboard/DashboardHeader'
import SearchBar from '../general/dashboard/SearchBar'
import DashboardDatePicker from '../general/dashboard/DashboardDatePicker'

const ChatHeader = () => {
    return (
        <div className="pt-0 pb-2 bg-white border-b border-[#E1E1E1]">
        <DashboardHeader
            titleAr="المحادثات"
            titleEn="Chats"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "المحادثات", titleEn: "Chats" },
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
        </div>
        </div>
    )
}

export default ChatHeader
