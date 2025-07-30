import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@heroui/react";
import React from "react";

const EditFaq = () => {
return (
        <section>
            <DashboardHeader
            titleAr="تعديل السؤال"
            titleEn="Edit question"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الاعدادات", titleEn: "Settings" },
            { titleAr: "تعديل السؤال", titleEn: "Edit question" },
            ]}

            />
            <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                {/* Country */}
                <div className="md:w-1/2 w-full">
                <Select>
                    <SelectTrigger
                    className="w-full !h-16 rounded-[12px] mt-4"
                    dir="rtl"
                    >
                    <SelectValue placeholder="البلد" />
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                    <SelectItem value="1">الامارات</SelectItem>
                    <SelectItem value="2">الامارات</SelectItem>
                    <SelectItem value="3">الامارات</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>
            <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                {/* Arabic Question */}
                <div className="relative w-full">
                <Input
                    label="السؤال ( باللغة العربية )"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    />
                </div>
                {/* English Question */}
                <div className="relative w-full">
                <Input
                    label="السؤال ( باللغة الانجليزية )"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                </div>
            </div>

            <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                {/* Arabic Question */}
                <div className="relative w-full">
                <Input
                    label="الاجابة ( باللغة العربية )"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                    />
                </div>
                {/* English Question */}
                <div className="relative w-full">
                <Input
                    label="الاجابة ( باللغة الانجليزية )"
                    variant="bordered"
                    placeholder="اكتب هنا"
                    classNames={{ label: "mb-2 text-base" }}
                    size="lg"
                />
                </div>
            </div>
    
            <div className="mt-4">
                <DashboardButton titleAr="حفظ" titleEn="Save" />
            </div>
            </div>
        </section>
    )
}

export default EditFaq
