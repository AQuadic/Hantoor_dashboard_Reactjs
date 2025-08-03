import DashboardHeader from "@/components/general/dashboard/DashboardHeader";

interface AddCarsHeaderProps {
  isEdit?: boolean;
}

const AddCarsHeader = ({ isEdit }: AddCarsHeaderProps) => {
  const titleAr = isEdit ? "تعديل سيارة" : "اضافة سيارة جديدة";
  const titleEn = isEdit ? "Edit car" : "Add new car";
  const lastBreadcrumb = isEdit
    ? { titleAr: "تعديل سيارة", titleEn: "Edit car" }
    : { titleAr: "اضافة سيارة جديدة", titleEn: "Add new car" };

  return (
    <div className="pt-2 pb-6 bg-white ">
      <DashboardHeader
        titleAr={titleAr}
        titleEn={titleEn}
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
          { titleAr: "السيارات", titleEn: "Cars", link: "/cars" },
          lastBreadcrumb,
        ]}
      />
    </div>
  );
};

export default AddCarsHeader;
