import DashboardButton from '@/components/general/dashboard/DashboardButton';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader'
import {Input, Select, SelectItem} from "@heroui/react";
import { useTranslation } from 'react-i18next';


const EditWhatsappNumber = () => {
    const { t } = useTranslation("setting");
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
            <div className="pt-0 pb-0 bg-white ">
            <DashboardHeader
                titleAr="تعديل رقم الوتساب"
                titleEn="Edit WhatsApp number"
                items={[
                { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
                { titleAr: "تعديل رقم الوتساب", titleEn: "Edit WhatsApp number" },
                ]}
            />
            </div>
            <div className='bg-white mx-8 rounded-[15px] mt-[14px] px-7 py-[19px]'>
                <div className='flex gap-[15px] mb-3'>
                    <div className="w-full">
                        <Select
                            items={countries}
                            label={t('country')}
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
                            label={t('maintenanceCenter')}
                            variant="bordered"
                            placeholder={t('centerName')}
                            classNames={{ label: "mb-2 text-base" }}
                            size="lg"
                        />
                    </div>
                </div>
            <DashboardButton titleAr="اضافة" titleEn="Add" />
            </div>
        </section>
    )
}

export default EditWhatsappNumber
