import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import PasswordInput from "@/components/general/PasswordInput";

const SubordinatesChangePassword = () => {
  return (
    <section>
      <DashboardHeader
        titleAr={"تغيير كلمة المرور"}
        titleEn={"Change Password"}
        items={[
          { titleAr: "لوحة التحكم", titleEn: "Dashbard", link: "/" },
          { titleAr: "المستخدمين", titleEn: "Users", link: "/users" },
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
            label="كلمة المرور الجديدة "
          />
          <PasswordInput
            value=""
            setValue={() => {}}
            label="  تأكيد كلمة المرور الجديدة "
          />
        </div>

        <div className="mt-4">
          <DashboardButton title={"حفظ"} />
        </div>
      </div>
    </section>
  );
};

export default SubordinatesChangePassword;
