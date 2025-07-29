import Location from "../icons/agents/Location";


const MaintenanceCentersTable = () => {
return (
<section className="mt-6 space-y-4">
{[...Array(3)].map((_, index) => (
    <div
    key={index}
    className="w-full h-[76px] bg-[#FFFFFF] border border-[#DEDEDE] rounded-[13px]"
    >
    <div className="py-3 px-5 flex items-center justify-between">
        <div>
        <h1 className="text-[#2A32F8] text-[17px] font-bold">
            المركز الدولي لصيانة السيارات
        </h1>
        <p className="text-[#03040A] text-sm mt-1">
            ش ذياب بن عيسى, مدينة خليفة, أبوظبي
        </p>
        </div>
        <div className="flex items-center gap-4">
        <Location />
        <img src="../../../public/images/whatsapp.svg" />
        <img src="../../../public/images/phone.svg" />
        </div>
    </div>
    </div>
))}
</section>
);
};

export default MaintenanceCentersTable;
