import DashboardButton from "@/components/general/dashboard/DashboardButton"
import DashboardHeader from "@/components/general/dashboard/DashboardHeader"
import { Input } from "@heroui/react"

const EditCountries = () => {
      return (
        <section>
            <DashboardHeader
                titleAr="تعديل البلد"
                titleEn="Edit country"
                items={[
                { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                { titleAr: "البلاد", titleEn: "Countries" },
                { titleAr: "تعديل البلد", titleEn: "Edit country" },
                ]}
            />

            <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                    {/* Arabic country */}
                    <div className="relative w-full">
                    <Input
                        label="البلد ( باللغة العربية )"
                        variant="bordered"
                        placeholder="الامارات"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                        />
                    </div>
                    {/* English country */}
                    <div className="relative w-full">
                    <Input
                        label="البلد ( باللغة الانجليزية )"
                        variant="bordered"
                        placeholder="اكتب هنا"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                    />
                    </div>
                </div>

                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                    {/* Arabic currency */}
                    <div className="relative w-full">
                    <Input
                        label="العملة ( باللغة العربية )"
                        variant="bordered"
                        placeholder="درهم اماراتي"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                        />
                    </div>
                    {/* English currency */}
                    <div className="relative w-full">
                    <Input
                        label="العملة ( باللغة الانجليزية )"
                        variant="bordered"
                        placeholder="اكتب هنا"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                    />
                    </div>
                </div>

                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                    <div className="relative w-full">
                    <Input
                        label="رسوم الخدمة"
                        variant="bordered"
                        placeholder="20 درهم"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                        />
                    </div>
                    <div className="relative w-full">
                    <Input
                        label="مدة خدمة البحث المتقدم"
                        variant="bordered"
                        placeholder="3"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                    />
                    </div>
                </div>
        
                <div className="mt-4">
                    <DashboardButton title={"حفظ"} />
                </div>
            </div>
        </section>
    )
}

export default EditCountries
