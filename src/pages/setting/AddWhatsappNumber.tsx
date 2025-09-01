import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getCountries, Country } from "@/api/countries/getCountry";
import { createRequestFinancing, CreateRequestFinancingParams } from "@/api/financing/addFinancing";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const AddWhatsappNumber = () => {
  const { t, i18n } = useTranslation("setting");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [, setLoading] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(1, ""),
  });

  const countries: Country[] = data?.data ?? [];

  const handleSubmit = async () => {
    if (!selectedCountry) {
      toast.error(t("pleaseSelectCountry"));
      return;
    }
    if (!phone) {
      toast.error(t("pleaseEnterPhone"));
      return;
    }

    const payload: CreateRequestFinancingParams = {
      phone: phone,
      country_id: Number(selectedCountry),
      is_active: true,
    };

    try {
      setLoading(true);
      const res = await createRequestFinancing(payload);
      if (res.success) {
        setPhone("");
        setSelectedCountry(null);
        toast.success(t("PhoneAddedSuccessfully"));
        navigate("/settings?section=Insurance+Price+Request+Button")
      } else {
        toast.error(res.message || t("somethingWentWrong"));
      }
    } catch (err: any) {
      toast.error(err.message || t("somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

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
              placeholder={t("selectCountry")}
              classNames={{
                trigger: "!h-[57px] bg-white border py-7.5",
                label: "text-sm text-gray-700",
                listbox: "bg-white shadow-md",
              }}
              isLoading={isLoading}
              selectedKeys={selectedCountry ? [selectedCountry] : []}
              onSelectionChange={(keys) =>
                setSelectedCountry(Array.from(keys)[0] as string)
              }
            >
              {(country) => (
                <SelectItem key={country.id}>
                  {i18n.language === "ar" ? country.name.ar : country.name.en}
                </SelectItem>
              )}
            </Select>
          </div>
          <div className="w-full">
            <DashboardInput
              label={t("whatsappNumber")}
              value={phone}
              onChange={setPhone}
              placeholder={t("writeHere")}
            />
          </div>
        </div>
        <DashboardButton
          titleAr="اضافة"
          titleEn="Add"
          onClick={handleSubmit}
        />
      </div>
    </section>
  );
};

export default AddWhatsappNumber;
