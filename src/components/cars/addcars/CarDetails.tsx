import { Input } from '@heroui/react'
import React from 'react'

const CarDetails = () => {
    return (
        <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
            <h1 className="text-lg text-[#2A32F8] font-bold mb-2">بيانات السيارة</h1>
            <div className="flex flex-col md:flex-row gap-[15px]">
                <div className="w-full">
                <Input
                    label="اسم مركز الصيانة ( باللغة العربية )"
                    variant="bordered"
                    placeholder=" المركز الدولي لصيانة السيارات"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                </div>
                <div className="w-full">
                <Input
                    label="اسم مركز الصيانة ( باللغة الانجليزية )"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
            </div>
        </div>
        </div>
    )
}

export default CarDetails
