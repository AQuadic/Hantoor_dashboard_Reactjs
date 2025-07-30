import DashboardHeader from "@/components/general/dashboard/DashboardHeader"


const AddCarsHeader = () => {
    return (
        <div className="pt-2 pb-6 bg-white ">
        <DashboardHeader
            titleAr="اضافة سيارة جديدة"
            titleEn="Add new car"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "السيارات", titleEn: "Cars" },
            { titleAr: "اضافة سيارة جديدة", titleEn: "Add new car" },
            ]}
        />
        </div>
    )
}

export default AddCarsHeader
