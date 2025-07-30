import AddMaintenanceCenter from '@/components/agents/AddMaintenanceCenter';
import AddSalesShowrooms from '@/components/agents/AddSalesShowrooms';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader'
import TabsFilter from '@/components/general/dashboard/TabsFilter'
import { Input } from '@heroui/react'

interface SubordinatesHeaderProps {
    selectedFilter: string;
    setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const AddAgent : React.FC<SubordinatesHeaderProps> = ({
    selectedFilter,
    setSelectedFilter,
}) => { 
    return (
        <section>
            <div className="pt-2 pb-6 bg-white ">
                <DashboardHeader
                    titleAr="اضافة وكيل جديد"
                    titleEn="Add new agent"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "الوكلاء", titleEn: "Agents", link: "/agents" },
                    { titleAr: "اضافة وكيل جديد", titleEn: "Add new agent", link: "/" },
                    ]}
                />
            </div>
                <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                    {/* Arabic name */}
                    <div className="relative w-full">
                    <Input
                        label="اسم الوكيل ( باللغة العربية )"
                        variant="bordered"
                        placeholder="الشركة الدولية التجارية"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                        />
                    </div>
                    {/* English name */}
                    <div className="relative w-full">
                    <Input
                        label="اسم الوكيل ( باللغة الانجليزية )"
                        variant="bordered"
                        placeholder="اكتب هنا"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                    />
                    </div>
                </div>

                <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                    {/* Link */}
                    <div className="relative w-full">
                    <Input
                        label="رابط الموقع الالكتروني"
                        variant="bordered"
                        placeholder="اكتب هنا"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                        />
                    </div>

                    <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                        <p className="text-right text-black text-sm">الماركة</p>
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

export default AddAgent
