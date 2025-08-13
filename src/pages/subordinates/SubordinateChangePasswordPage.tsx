import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import PasswordInput from "@/components/general/PasswordInput";
import { useTranslation } from "react-i18next";

const SubordinatesChangePassword = () => {
  const { t } = useTranslation("subordinates");
  return (
    <section>
      <DashboardHeader
        titleAr={"تغيير كلمة المرور"}
        titleEn={"Change Password"}
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashbard", link: "/" },
          {
            titleAr: "المسؤولين الفرعيين",
            titleEn: "Subordinates",
            link: "/subordinates",
          },
          {
            titleAr: "تغيير كلمة المرور",
            titleEn: "Change Password",
            link: "/dashboard/change-password",
          },
        ]}
      />

      <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
        <div className="flex items-center gap-[15px]">
          <PasswordInput
            value=""
            setValue={() => {}}
            label={t('newPassword')}
          />
          <PasswordInput
            value=""
            setValue={() => {}}
            label={t('confirmNewPassword')}
          />
        </div>

        <div className="mt-4">
          <DashboardButton 
            titleEn={"Save"}
              titleAr={"حفظ"}  
          />
        </div>
      </div>
    </section>
  );
};

export default SubordinatesChangePassword;
