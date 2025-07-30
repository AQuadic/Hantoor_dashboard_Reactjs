import DashboardButton from '../general/dashboard/DashboardButton';
import DashboardHeader from '../general/dashboard/DashboardHeader'
import { Select, SelectItem} from "@heroui/react";
const EditUsers = () => {
    const countries = [
        {key: "1", label: "مصر"},
        {key: "2", label: "مصر"},
        {key: "3", label: "مصر"},
        {key: "4", label: "مصر"},
        {key: "5", label: "مصر"},
        {key: "6", label: "مصر"},
    ];
    return (
        <section>
            <DashboardHeader 
            titleAr={"تعديل المستخدم"} titleEn={"Edit user"} 
            items={[
                { titleAr: "لوحة التحكم", titleEn: "Dashbard", link: "/" },
                { titleAr: "المستخدمين", titleEn: "Users", link: "/users" },
                { titleAr: "تعديل المستخدم", titleEn: "Edit user", link: "/dashboard/addUsers" },
            ]} 
            />
    
            <div className=" bg-white mt-3 rounded-[15px] py-[19px] px-[29px] mx-8">
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
                <div className="relative w-1/2 mt-[18px] rtl:pl-2 ltr:pr-2">
                    <Select
                    items={countries}
                    label="البلد"
                    placeholder="الجميع"
                    classNames={{
                        trigger: 'h-[53px] !h-[53px] min-h-[53px] bg-white border',
                        label: '!text-[15px] !text-[#000000]',
                        listbox: 'bg-white shadow-md',
                    }}
                    >
                    {(country) => <SelectItem>{country.label}</SelectItem>}
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
