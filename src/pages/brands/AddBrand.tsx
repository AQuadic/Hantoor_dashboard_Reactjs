import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import ImageInput from "@/components/general/ImageInput";
import { Input } from "@heroui/react";
import React from "react";
import { useParams } from "react-router";

const AddBrand = () => {
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const params = useParams();
  const brandId = params.id;

  const isEdit = Boolean(brandId);

  const oldValues = {
    image: "aaa",
    name: "car name",
  };

  return (
    <div>
      <DashboardHeader
        titleAr={isEdit ? "تعديل ماركة" : "اضافة ماركة جديدة"}
        titleEn={isEdit ? "Edit Brand" : "Add Brand"}
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: isEdit ? "تعديل ماركة" : "اضافة ماركة جديدة",
            titleEn: isEdit ? "Edit Brand" : "Add Brand",
            link: isEdit ? `/brands/${brandId}` : "/brands/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="p-8 bg-white rounded-2xl ">
          <h3 className="mb-4 text-lg font-bold">الصورة الشخصية</h3>
          <ImageInput image={profileImage} setImage={setProfileImage} />
        </div>
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <h3 className="mb-2 text-lg font-bold "> البيانات الاساسية</h3>
          <div className="flex gap-4">
            <Input
              label="اسم الماركة ( باللغة العربية )"
              variant="bordered"
              placeholder=" تويوتا"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
            />
            <Input
              label=" اسم الماركة ( باللغة الانجليزية )"
              variant="bordered"
              placeholder="اكتب هنا"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
            />
          </div>

          <DashboardButton title=" حفظ" />
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
