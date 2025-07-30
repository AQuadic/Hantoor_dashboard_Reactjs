import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader'
import { Input } from '@heroui/react'
import { Select, SelectItem} from "@heroui/react";

const EditBodyType = () => {
    const agent = [
        {key: "1", label: "2025"},
        {key: "2", label: "2025"},
        {key: "3", label: "2025"},
        {key: "4", label: "2025"},
        {key: "5", label: "2025"},
        {key: "6", label: "2025"},
    ];
    return (
        <div>
            <div className="pt-2 pb-6 bg-white ">
                <DashboardHeader
                    titleAr="تعديل نوع الهيكل"
                    titleEn="Edit structure type"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: " اقسام السيارات", titleEn: "Car sections", link: "/models" },
                    { titleAr: "تعديل نوع الهيكل", titleEn: "Edit structure type" },
                    ]}
                />
            </div>
            <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px] md:mx-8 mx-2">
                <div className="flex flex-col md:flex-row gap-[15px]">
                    <div className="w-full">
                    <Input
                        label="اسم الفئة ( باللغة العربية )"
                        variant="bordered"
                        placeholder="SUV"
                        classNames={{ label: "mb-2 text-base" }}
                        size="md"
                    />
                    </div>
                    <div className="w-full">
                    <Input
                        label="اسم الفئة ( باللغة الانجليزية )"
                        variant="bordered"
                        placeholder="اكتب هنا"
                        classNames={{ label: "mb-2 text-base" }}
                        size="md"
                    />
                    </div>
                </div>
                <div className="w-1/2 rtl:pl-2 ltr:pr-2 mt-4">
                    <Select
                        items={agent}
                        label="الموديل"
                        placeholder="2025"
                        classNames={{
                            trigger: 'h-[53px] !h-[53px] min-h-[53px] bg-white border py-0',
                            label: 'text-sm text-gray-700',
                            listbox: 'bg-white shadow-md',
                        }}
                        >
                        {(country) => <SelectItem>{country.label}</SelectItem>}
                    </Select>
                </div>
                <div className='mt-4'>
                    <DashboardButton title='حفظ' />
                </div>
            </div>
        </div>
    )
}

export default EditBodyType
