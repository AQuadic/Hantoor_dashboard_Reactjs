import AddMaintenanceCenter from '@/components/agents/AddMaintenanceCenter';
import AddSalesShowrooms from '@/components/agents/AddSalesShowrooms';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader'
import TabsFilter from '@/components/general/dashboard/TabsFilter'
import DashboardInput from '@/components/general/DashboardInput';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface SubordinatesHeaderProps {
    selectedFilter: string;
    setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const EditAgent : React.FC<SubordinatesHeaderProps> = ({
    selectedFilter,
    setSelectedFilter,
}) => { 
    const { t } = useTranslation("agents");
    const [arName, setArName] = useState("");
    const [enName, setEnName] = useState("");
    const [emailLink, setEmailLink] = useState("");
    return (
        <section>
            <div className="pt-0 pb-2 bg-white ">
                <DashboardHeader
                    titleAr="تعديل الوكيل"
                    titleEn="Edit agent"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "الوكلاء", titleEn: "Agents", link: "/" },
                    { titleAr: "تعديل الوكيل", titleEn: "Edit agent", link: "/" },
                    ]}
                />
            </div>
                <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                    {/* Arabic name */}
                    <div className="relative w-full">
                    <DashboardInput
                        label={t('arName')}
                        value={arName}
                        onChange={setArName}
                        placeholder="الشركة الدولية التجارية"
                    />
                    </div>
                    {/* English name */}
                    <div className="relative w-full">
                    <DashboardInput
                        label={t('enName')}
                        value={enName}
                        onChange={setEnName}
                        placeholder={t('writeHere')}
                    />
                    </div>
                </div>

                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                    {/* Link */}
                    <div className="relative w-full">
                    <DashboardInput
                        label={t('emailLink')}
                        value={emailLink}
                        onChange={setEmailLink}
                        placeholder={t('writeHere')}
                    />
                    </div>

                    <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                        <p className="text-right text-black text-sm">{t('brand')}</p>
                        <div className="flex items-center justify-between gap-1">
                            <span className="text-gray-500 text-sm">تويوتا</span>
                            <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                            <option value="شهر">تويوتا</option>
                            <option value="أيام">كيا</option>
                            <option value="سنوات">جييب</option>
                            <option value="سنوات">BMW</option>
                            <option value="سنوات">مرسيدس</option>
                            </select>
                        </div>
                        </div>
                </div>
                <hr className='my-[11px]'/>

                <TabsFilter
                filters={[
                {
                    titleAr: "اضافة مراكز الصيانة",
                    titleEn: "Add maintenance centers"
                },
                {
                    titleAr: "اضافة معارض البيع",
                    titleEn: "Add sales Showrooms",
                },
                ]}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />
                {selectedFilter === "Add maintenance centers" && (
                    <AddMaintenanceCenter />
                )}

                {selectedFilter === "Add sales Showrooms" && (
                    <AddSalesShowrooms />
                )}
        
            </div>

        </section>
    )
}

export default EditAgent
