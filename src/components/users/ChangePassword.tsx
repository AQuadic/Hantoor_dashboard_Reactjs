import DashboardButton from "../general/dashboard/DashboardButton"
import DashboardHeader from "../general/dashboard/DashboardHeader"
import Password from "../icons/login/Password"

const ChangePassword = () => {
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
                        type="password"
                        name="password"
                        id="password"
                        className="w-full h-[53px] border border-[#E2E2E2] rounded-[12px] mt-[18px] px-4 pt-4"
                        placeholder="********************"
                        />
                        <h2 className="text-[#000000] text-[15px] absolute top-5 rtl:right-4 ltr:left-4">
                        كلمة المرور
                        </h2>
                        <div className="absolute top-9.5 rtl:left-5 ltr:right-5">
                        <Password />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative w-full">
                    <input
                        type="password"
                        name="confirm password"
                        id="confirm password"
                        className="w-full h-[53px] border border-[#E2E2E2] rounded-[12px] mt-[18px] px-4 pt-4"
                        placeholder="********************"
                    />
                    <h2 className="text-[#000000] text-[15px] absolute top-5 rtl:right-4 ltr:left-4">
                        كلمة المرور
                    </h2>
                    <div className="absolute top-9.5 rtl:left-5 ltr:right-5">
                        <Password />
                    </div>
                    </div>
                </div>

                <div className="mt-4">
                    <DashboardButton title={"حفظ"} />
                </div>
            </div>
        </section>
    )
}

export default ChangePassword
