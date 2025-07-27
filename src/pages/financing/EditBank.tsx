import DashboardButton from '@/components/general/dashboard/DashboardButton'
import ImageInput from '@/components/general/ImageInput'
import MobileInput from '@/components/general/MobileInput';
import { Input } from '@heroui/react'
import React, { useState } from 'react'
import { countries } from "countries-list";
import Add from '@/components/icons/banks/Add';
import Delete from '@/components/icons/banks/Delete';
import DashboardHeader from '@/components/general/dashboard/DashboardHeader';

const getCountryByIso2 = (iso2: string) => {
  const country = countries[iso2 as keyof typeof countries];
  if (!country) return { iso2: "EG", name: "Egypt", phone: ["20"] };
  return {
    iso2,
    name: country.name,
    phone: [country.phone],
  };
};
interface EditProfileFormProps {
    profileImage: File | null;
    setProfileImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const EditBank = ({
    profileImage,
    setProfileImage,
}: EditProfileFormProps)  => {
     const [selectedCountry, setSelectedCountry] = useState(
        getCountryByIso2("EG")
    );
    const [phone, setPhone] = useState("");


    return (
        <section>
            <div className="pt-2 pb-6 bg-white ">
                <DashboardHeader
                    titleAr="تعديل البنك"
                    titleEn="Edit bank"
                    items={[
                    { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
                    { titleAr: "الوكلاء", titleEn: "Agents", link: "/" },
                    { titleAr: "البنوك", titleEn: "Banks", link: "/" },
                    { titleAr: "تعديل البنك", titleEn: "Edit bank" },
                    ]}
                />
            </div>
            <form className="p-8">
                <div className="p-8 bg-white rounded-2xl ">
                    <h3 className="mb-4 text-lg font-bold text-[#2A32F8]">صورة شعار البنك</h3>
                    <ImageInput image={profileImage} setImage={setProfileImage} />
                    <div className="flex md:flex-row flex-col items-center gap-[15px] mt-4">
                        {/* Arabic bank */}
                        <div className="relative w-full">
                        <Input
                            label="اسم البنك ( باللغة العربية )"
                            variant="bordered"
                            placeholder="بنك أبوظبي الأول"
                            classNames={{ label: "mb-2 text-base" }}
                            size="lg"
                            />
                        </div>
                        {/* English bank */}
                        <div className="relative w-full">
                        <Input
                            label="اسم البنك ( باللغة الانجليزية )"
                            variant="bordered"
                            placeholder="اكتب هنا"
                            classNames={{ label: "mb-2 text-base" }}
                            size="lg"
                        />
                        </div>
                    </div>
                    <MobileInput
                        selectedCountry={selectedCountry}
                        setSelectedCountry={setSelectedCountry}
                        phone={phone}
                        setPhone={setPhone}
                    />
                </div>
                <div className="flex flex-wrap gap-6 p-8 mt-8 bg-white rounded-2xl !text-base">
                    <div>
                        <div className="flex flex-col flex-1 gap-4">
                        <h3 className=" text-lg font-bold text-[#2A32F8]">بيانات الوافد</h3>
                        <h2 className="text-[15px] font-bold text-[#1E1B1B]">رينج المرتب</h2>
                        <div className='flex items-center gap-[9px]'>
                            <Input
                                label="المرتب من"
                                variant="bordered"
                                placeholder="5000 درهم"
                                classNames={{ label: "mb-2 text-base" }}
                                size="lg"
                            />
                            <Input
                                label="المرتب الى"
                                variant="bordered"
                                placeholder="5000 درهم"
                                classNames={{ label: "mb-2 text-base" }}
                                size="lg"
                            />
                        </div>
                        <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                            <p className="text-right text-black text-sm">المدة</p>
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-gray-500 text-sm">3</span>
                                <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                                <option value="شهر">شهر</option>
                                <option value="أيام">أيام</option>
                                <option value="سنوات">سنوات</option>
                                </select>
                            </div>
                        </div>
                            <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                            <p className="text-right text-black text-sm">جهة العمل</p>
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-gray-500 text-sm">جهة حكومية</span>
                                <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                                <option value="1">جهة حكومية</option>
                                <option value="2">جهة حكومية</option>
                                <option value="3">جهة حكومية</option>
                                </select>
                            </div>
                        </div>
                        <Input
                            label="قيمة الفائدة"
                            variant="bordered"
                            placeholder="5%"
                            classNames={{ label: "mb-2 text-base" }}
                            size="lg"
                        />
                        </div>
                        <hr className='my-4'/>
                        <div className="flex flex-col flex-1 gap-4">
                        <div className='flex items-center justify-between'>
                            <div>
                                <h3 className=" text-lg font-bold text-[#2A32F8]">بيانات الوافد</h3>
                                <h2 className="text-[15px] font-bold text-[#1E1B1B] mt-2">رينج المرتب</h2>
                            </div>
                        <Delete />
                        </div>
                        <div className='flex items-center gap-[9px]'>
                            <Input
                                label="المرتب من"
                                variant="bordered"
                                placeholder="5000 درهم"
                                classNames={{ label: "mb-2 text-base" }}
                                size="lg"
                            />
                            <Input
                                label="المرتب الى"
                                variant="bordered"
                                placeholder="5000 درهم"
                                classNames={{ label: "mb-2 text-base" }}
                                size="lg"
                            />
                        </div>
                        <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                            <p className="text-right text-black text-sm">المدة</p>
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-gray-500 text-sm">3</span>
                                <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                                <option value="شهر">شهر</option>
                                <option value="أيام">أيام</option>
                                <option value="سنوات">سنوات</option>
                                </select>
                            </div>
                        </div>
                            <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                            <p className="text-right text-black text-sm">جهة العمل</p>
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-gray-500 text-sm">جهة حكومية</span>
                                <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                                <option value="1">جهة حكومية</option>
                                <option value="2">جهة حكومية</option>
                                <option value="3">جهة حكومية</option>
                                </select>
                            </div>
                        </div>
                        <Input
                            label="قيمة الفائدة"
                            variant="bordered"
                            placeholder="5%"
                            classNames={{ label: "mb-2 text-base" }}
                            size="lg"
                        />

                        <div className='w-full h-[45px] border border-dashed border-[#D1D1D1] rounded-[12px] flex items-center justify-center gap-[10px] cursor-pointer'>
                            <Add />
                            <p className='text-[#2A32F8] text-base'>اضافة بيانات اخرى</p>
                            </div>
                        <DashboardButton title=" اضافة" />
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 gap-4">
                    <h3 className=" text-lg font-bold text-[#2A32F8]">بيانات المواطن</h3>
                    <h2 className="text-[15px] font-bold text-[#1E1B1B]">رينج المرتب</h2>
                    <div className='flex items-center gap-[9px]'>
                        <Input
                            label="المرتب من"
                            variant="bordered"
                            placeholder="5000 درهم"
                            classNames={{ label: "mb-2 text-base" }}
                            size="lg"
                        />
                        <Input
                            label="المرتب الى"
                            variant="bordered"
                            placeholder="5000 درهم"
                            classNames={{ label: "mb-2 text-base" }}
                            size="lg"
                        />
                    </div>
                    <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                        <p className="text-right text-black text-sm">المدة</p>
                        <div className="flex items-center justify-between gap-1">
                            <span className="text-gray-500 text-sm">3</span>
                            <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                            <option value="شهر">شهر</option>
                            <option value="أيام">أيام</option>
                            <option value="سنوات">سنوات</option>
                            </select>
                        </div>
                    </div>
                        <div className="relative w-full border border-gray-300 rounded-lg p-3  text-sm">
                        <p className="text-right text-black text-sm">جهة العمل</p>
                        <div className="flex items-center justify-between gap-1">
                            <span className="text-gray-500 text-sm">جهة حكومية</span>
                            <select className="text-blue-600 bg-transparent focus:outline-none text-sm cursor-pointer">
                            <option value="1">جهة حكومية</option>
                            <option value="2">جهة حكومية</option>
                            <option value="3">جهة حكومية</option>
                            </select>
                        </div>
                    </div>
                    <Input
                        label="قيمة الفائدة"
                        variant="bordered"
                        placeholder="5%"
                        classNames={{ label: "mb-2 text-base" }}
                        size="lg"
                    />
                    <div className='w-full h-[45px] border border-dashed border-[#D1D1D1] rounded-[12px] flex items-center justify-center gap-[10px] cursor-pointer'>
                        <Add />
                        <p className='text-[#2A32F8] text-base'>اضافة بيانات اخرى</p>
                    </div>
                    <DashboardButton title=" اضافة" />
                    </div>
                </div>
            </form>
        </section>
    )
}

export default EditBank
