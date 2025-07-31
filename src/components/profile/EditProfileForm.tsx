import { Input } from "@heroui/react";
import React from "react";
import ImageInput from "../general/ImageInput";
import DashboardButton from "../general/dashboard/DashboardButton";

interface EditProfileFormProps {
  profileImage: File | null;
  setProfileImage: React.Dispatch<React.SetStateAction<File | null>>;
}
const EditProfileForm = ({
  profileImage,
  setProfileImage,
}: EditProfileFormProps) => {
  return (
    <form className="p-8">
      <div className="p-8 bg-white rounded-2xl ">
        <h3 className="mb-4 text-lg font-bold">الصورة الشخصية</h3>
        <ImageInput image={profileImage} setImage={setProfileImage} />
      </div>
      <div className="flex gap-6 p-8 mt-8 bg-white rounded-2xl !text-base">
        <div className="flex flex-col flex-1 gap-4">
          <h3 className="mb-2 text-lg font-bold "> البيانات الاساسية</h3>
          <Input
            label="الاسم"
            variant="bordered"
            placeholder="محمد احمد"
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
          />
          <Input
            label="البريد الالكتروني"
            variant="bordered"
            placeholder="username@mail.com"
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
          />
          <Input
            label=" رقم الجوال"
            variant="bordered"
            placeholder="0123456789"
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
          />
          <DashboardButton titleAr=" حفظ" titleEn="Save"/>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <h3 className="mb-2 text-lg font-bold"> كلمة المرور</h3>
          <Input
            label="كلمة المرور الحالية"
            variant="bordered"
            placeholder="********"
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
          />
          <Input
            label="كلمة المرور الجديدة"
            variant="bordered"
            placeholder="********"
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
          />
          <Input
            label="تأكيد كلمة المرور"
            variant="bordered"
            placeholder="********"
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
          />
          <DashboardButton titleAr=" حفظ" titleEn="Save" />
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
