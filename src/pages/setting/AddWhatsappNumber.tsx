import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AddWhatsappNumber = () => {
  const { t } = useTranslation("setting");
  const [maintenanceCenter, setMaintenanceCenter] = useState("");
  const countries = [
    { key: "مصر", label: "مصر" },
    { key: "مصر", label: "مصر" },
    { key: "مصر", label: "مصر" },
    { key: "مصر", label: "مصر" },
    { key: "مصر", label: "مصر" },
    { key: "مصر", label: "مصر" },
  ];
  return (
    <section>
      <div className=" bg-white ">
        <DashboardHeader
          titleAr="اضافة رقم واتساب جديد"
          titleEn="Add a new WhatsApp number"
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
            {
              titleAr: "اضافة رقم واتساب جديد",
              titleEn: "Add a new WhatsApp number",
            },
          ]}
        />
      </div>
      <div className="bg-white mx-8 rounded-[15px] mt-[14px] px-7 py-[19px]">
        <div className="flex gap-[15px] mb-3">
          <div className="w-full">
            <Select
              items={countries}
              label={t("country")}
              placeholder="الامارات"
              classNames={{
                trigger: "!h-[57px] bg-white border py-7.5",
                label: "text-sm text-gray-700",
                listbox: "bg-white shadow-md",
              }}
            >
              {(animal) => <SelectItem>{animal.label}</SelectItem>}
            </Select>
          </div>
          <div className="w-full">
            <DashboardInput
              label={t("maintenanceCenter")}
              value={maintenanceCenter}
              onChange={setMaintenanceCenter}
              placeholder={t("centerName")}
            />
          </div>
        </div>
        <DashboardButton titleAr="اضافة" titleEn="Add" />
      </div>
    </section>
  );
};

export default AddWhatsappNumber;
