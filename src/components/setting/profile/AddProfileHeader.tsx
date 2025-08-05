import DashboardHeader from "@/components/general/dashboard/DashboardHeader"

const AddProfileHeader = () => {
    return (
        <div className="pt-0 pb-2 bg-white ">
        <DashboardHeader
            titleAr="اضافة صفحة تعريفية جديدة"
            titleEn="Add a new profile page"
            items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
            { titleAr: "اضافة صفحة تعريفية جديدة", titleEn: "Add a new profile page" },
            ]}
        />
        </div>
    )
}

export default AddProfileHeader
