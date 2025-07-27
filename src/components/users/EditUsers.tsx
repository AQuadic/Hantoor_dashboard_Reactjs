import DashboardButton from '../general/dashboard/DashboardButton';
import DashboardHeader from '../general/dashboard/DashboardHeader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const EditUsers = () => {
    return (
        <section>
            <DashboardHeader 
            titleAr={"لوحة التحكم"} titleEn={"Dashboard"} 
            items={[
                { titleAr: "لوحة التحكم", titleEn: "Dashbard", link: "/" },
                { titleAr: "المستخدمين", titleEn: "Users", link: "/users" },
                { titleAr: "إضافة مستخدم جدبد", titleEn: "Add new user", link: "/dashboard/addUsers" },
            ]} 
            />
    
            <div className="w-full bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
            {/* Name */}
            <div className="relative">
                <input
                type="name"
                name="name"
                id="name"
                className="w-full h-[53px] border border-[#E2E2E2] rounded-[12px] mt-[15px] px-4 pt-4"
                placeholder="username@mail.com"
                />
                <h2 className="text-[#000000] text-[15px] font-normal absolute rtl:top-5 ltr:top-4 rtl:right-4 ltr:left-4">
                الاسم
                </h2>
                <div className="absolute top-9 left-5"></div>
            </div>
            <div className="flex md:flex-row flex-col items-center gap-[15px]">
                {/* Email */}
                <div className="relative w-full">
                <input
                    type="email"
                    name="email"
                    id="email"
                    className=" w-full h-[53px] border border-[#E2E2E2] rounded-[12px] mt-[15px] px-4 pt-4"
                    placeholder="username@mail.com"
                />
                <h2 className="text-[#000000] text-[15px] font-normal absolute rtl:top-5 ltr:top-4 rtl:right-4 ltr:left-4">
                    البريد الالكنتروني
                </h2>
                <div className="absolute top-9 left-5"></div>
                </div>
                {/* Phone */}
                <div className="relative w-full">
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className=" w-full h-[53px] border border-[#E2E2E2] rounded-[12px] mt-[15px] px-4 pt-4"
                    placeholder="+20"
                />
                <h2 className="text-[#000000] text-[15px] font-normal absolute rtl:top-5 ltr:top-4 rtl:right-4 ltr:left-4">
                    رقم الجوال
                </h2>
                <div className="absolute top-9 left-5"></div>
                </div>
            </div>
            <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                {/* Country */}
                <div className="w-1/2">
                <Select>
                    <SelectTrigger
                    className="w-full !h-[53px] rounded-[12px] mt-4"
                    dir="rtl"
                    >
                    <SelectValue placeholder="البلد" />
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                    <SelectItem value="1">الامارات</SelectItem>
                    <SelectItem value="2">الامارات</SelectItem>
                    <SelectItem value="3">الامارات</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>
    
            <div className="mt-4">
                <DashboardButton title={"حفظ"} />
            </div>
            </div>
        </section>
    )
}

export default EditUsers
