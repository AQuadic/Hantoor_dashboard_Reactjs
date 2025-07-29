import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader'
import {Input, Select, SelectItem} from "@heroui/react";


const AddWhatsappNumber = () => {
    const countries = [
        {key: "مصر", label: "مصر"},
        {key: "مصر", label: "مصر"},
        {key: "مصر", label: "مصر"},
        {key: "مصر", label: "مصر"},
        {key: "مصر", label: "مصر"},
        {key: "مصر", label: "مصر"},
    ];
    return (
        <section>
            <div className="pt-2 pb-6 bg-white ">
            <DashboardHeader
                titleAr="اضافة رقم واتساب جديد"
                titleEn="Add a new WhatsApp number"
                items={[
                { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
                { titleAr: "اضافة رقم واتساب جديد", titleEn: "Add a new WhatsApp number" },
                ]}
            />
            </div>
            <div className='bg-white mx-8 rounded-[15px] mt-[14px] px-7 py-[19px]'>
                <div className='flex gap-[15px] mb-3'>
                    <div className="w-full">
                        <Select
                            items={countries}
                            label="البلد"
                            placeholder="الامارات"
                            classNames={{
                                trigger: '!h-[57px] bg-white border py-7.5',
                                label: 'text-sm text-gray-700',
                                listbox: 'bg-white shadow-md',
                            }}
                            >
                            {(animal) => <SelectItem>{animal.label}</SelectItem>}
                        </Select>
                    </div>
                    <div className="w-full">
                        <Input
                            label="اسم مركز الصيانة ( باللغة العربية )"
                            variant="bordered"
                            placeholder=" المركز الدولي لصيانة السيارات"
                            classNames={{ label: "mb-2 text-base" }}
                            size="lg"
                        />
                    </div>
                </div>
                <DashboardButton title={"اضافة "} />
            </div>
        </section>
    )
}

export default AddWhatsappNumber
