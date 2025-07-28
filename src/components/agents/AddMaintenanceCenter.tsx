import { Input } from '@heroui/react'
import Add from '../icons/banks/Add'
import DashboardButton from '../general/dashboard/DashboardButton'

const AddMaintenanceCenter = () => {
    return (
        <div className="bg-white mt-6 rounded-[15px]">
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

        <div className="flex flex-col md:flex-row gap-[15px] mt-4">
            <div className="w-full">
            <Input
                label="وصف العنوان ( باللغة العربية )"
                variant="bordered"
                placeholder="اكتب هنا"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
            />
            </div>
            <div className="w-full">
            <Input
                label="وصف العنوان ( باللغة الانجليزية )"
                variant="bordered"
                placeholder="اكتب هنا"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
            />
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-[15px] mt-4">
            <div className="w-full">
            <Input
                label="لينك جوجل ماب"
                variant="bordered"
                placeholder="اكتب هنا"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
            />
            </div>
            <div className="w-full">
            <Input
                label="رقم الجوال"
                variant="bordered"
                placeholder="123456789"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
            />
            </div>
        </div>

        <div className='mt-4 w-1/2'>
            <div className="w-full">
            <Input
                label="رقم الواتساب"
                variant="bordered"
                placeholder="123456789"
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
            />
            </div>
        </div>

        <div className='w-full h-[45px] border border-dashed border-[#D1D1D1] rounded-[12px] flex items-center justify-center gap-[10px] cursor-pointer mt-5'>
            <Add />
            <p className='text-[#2A32F8] text-base'>اضافة بيانات اخرى</p>
        </div>

        <div className="mt-6">
            <DashboardButton title="حفظ" />
        </div>
        </div>
    )
}

export default AddMaintenanceCenter
