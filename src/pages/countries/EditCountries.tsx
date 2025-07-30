import DashboardButton from "@/components/general/dashboard/DashboardButton"
import DashboardHeader from "@/components/general/dashboard/DashboardHeader"
import { Input } from "@heroui/react"
import { useTranslation } from "react-i18next";

const EditCountries = () => {
    const { t } = useTranslation("country");
    return (
        <section>
            <DashboardHeader
                titleAr="تعديل البلد"
                titleEn="Edit country"
                items={[
                { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                { titleAr: "البلاد", titleEn: "Countries", link :'/countries' },
                { titleAr: "تعديل البلد", titleEn: "Edit country" },
                ]}
            />

            <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                    {/* Arabic country */}
                    <div className="relative w-full">
                    <Input
                        label={t('arCountry')}
                        variant="bordered"
                        placeholder="الامارات"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                        />
                    </div>
                    {/* English country */}
                    <div className="relative w-full">
                    <Input
                        label={t('enCountry')}
                        variant="bordered"
                        placeholder={t('writeHere')}
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                    />
                    </div>
                </div>

                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                    {/* Arabic currency */}
                    <div className="relative w-full">
                    <Input
                        label={t('arCurrency')}
                        variant="bordered"
                        placeholder="درهم اماراتي"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                        />
                    </div>
                    {/* English currency */}
                    <div className="relative w-full">
                    <Input
                        label={t('enCurrency')}
                        variant="bordered"
                        placeholder={t('writeHere')}
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                    />
                    </div>
                </div>

                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                    <div className="relative w-full">
                    <Input
                        label={t('tax')}
                        variant="bordered"
                        placeholder="20 درهم"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                        />
                    </div>
                    <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                        <p className="text-right text-black text-sm">{t('time')}</p>
                        <div className="flex items-center justify-between gap-1">
                            <span className="text-gray-500 text-sm">3</span>
                            <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                            <option value="شهر">{t('month')}</option>
                            <option value="أيام">{t('day')}</option>
                            <option value="سنوات">{t('year')}</option>
                            </select>
                        </div>
                        </div>
                </div>
        
                <div className="mt-4">
                    <DashboardButton titleAr={"حفظ"} titleEn={"Save"} />
                </div>
            </div>
        </section>
    )
}

export default EditCountries
