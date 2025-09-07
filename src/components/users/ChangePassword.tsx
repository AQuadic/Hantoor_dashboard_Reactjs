import { useState } from "react";
import DashboardButton from "../general/dashboard/DashboardButton";
import DashboardHeader from "../general/dashboard/DashboardHeader";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";
import { changePassword } from "@/api/password/changePassword";
import toast from "react-hot-toast";

const ChangePassword = () => {
    const { t } = useTranslation("users");

    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
    if (!currentPassword || !password || !passwordConfirmation) {
        toast.error(t("allFieldsRequired") || "All fields are required");
        return;
    }
    if (password !== passwordConfirmation) {
        toast.error(t("passwordsNotMatch") || "Passwords do not match");
        return;
    }

    try {
        setLoading(true);

        const response = await changePassword({
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation,
        });

        toast.success(response.message || t("successMessage"));
    } catch (error: any) {
        toast.error(error?.response?.data?.message || t("errorMessage"));
    } finally {
        setLoading(false);
    }
    };

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
                <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-[15px]">
                    {/* Current Password */}
                    <div className="relative w-full">
                        <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="current_password"
                        id="current_password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full h-[64px] border border-[#E2E2E2] rounded-[12px] px-4 pt-4"
                        placeholder="********************"
                        />
                        <h2 className="text-[#000000] text-[15px] absolute top-2 rtl:right-4 ltr:left-4">
                        {t("currentPassword")}
                        </h2>
                        <div
                        className="absolute top-9.5 rtl:left-5 ltr:right-5 cursor-pointer"
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                        >
                        {showCurrentPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </div>
                    </div>
                    {/* New Password */}
                    <div className="relative w-full">
                        <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-[64px] border border-[#E2E2E2] rounded-[12px] px-4 pt-4"
                        placeholder="********************"
                        />
                        <h2 className="text-[#000000] text-[15px] absolute top-2 rtl:right-4 ltr:left-4">
                        {t("password")}
                        </h2>
                        <div
                        className="absolute top-9.5 rtl:left-5 ltr:right-5 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                        >
                        {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative w-full">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="password_confirmation"
                        id="password_confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        className="w-full h-[64px] border border-[#E2E2E2] rounded-[12px] px-4 pt-4"
                        placeholder="********************"
                    />
                    <h2 className="text-[#000000] text-[15px] absolute top-2 rtl:right-4 ltr:left-4">
                        {t('confirmPassword')}
                    </h2>
                    <div className="absolute top-9.5 rtl:left-5 ltr:right-5 cursor-pointer"onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </div>
                    </div>
                </div>

                <div className="mt-4">
                    <DashboardButton titleAr={loading ? "جارٍ الحفظ..." : "حفظ"} titleEn={loading ? "Saving..." : "Save"} onClick={handleSubmit}/>
                </div>
            </div>
        </section>
    )
}

export default ChangePassword
