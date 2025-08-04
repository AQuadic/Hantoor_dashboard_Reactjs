import { useState } from "react";
import DashboardButton from "../general/dashboard/DashboardButton"
import DashboardHeader from "../general/dashboard/DashboardHeader"
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
    const { t } = useTranslation("users");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <section>
            <DashboardHeader 
                titleAr={"تغيير كلمة المرور"} titleEn={"Change Password"} 
                items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashbard", link: "/" },
                    { titleAr: "المستخدمين", titleEn: "Users", link: "/users" },
                    { titleAr: "تغيير كلمة المرور", titleEn: "Change Password", link: "/dashboard/change-password" },
                ]} 
            />

            <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
                <div className="flex items-center gap-[15px]">
                    {/* Password */}
                    <div className="relative w-full">
                        <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className="w-full h-[64px] border border-[#E2E2E2] rounded-[12px] mt-[18px] px-4 pt-4"
                        placeholder="********************"
                        />
                        <h2 className="text-[#000000] text-[15px] absolute top-5 rtl:right-4 ltr:left-4">
                        {t('password')}
                        </h2>
                        <div className="absolute top-9.5 rtl:left-5 ltr:right-5 cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative w-full">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm password"
                        id="confirm password"
                        className="w-full h-[64px] border border-[#E2E2E2] rounded-[12px] mt-[18px] px-4 pt-4"
                        placeholder="********************"
                    />
                    <h2 className="text-[#000000] text-[15px] absolute top-5 rtl:right-4 ltr:left-4">
                        {t('confirmPassword')}
                    </h2>
                    <div className="absolute top-9.5 rtl:left-5 ltr:right-5 cursor-pointer" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </div>
                    </div>
                </div>
                </div>

                <div className="mt-4">
                    <DashboardButton titleAr={"حفظ"} titleEn={"Save"} />
                </div>
        </section>
    )
}

export default ChangePassword
