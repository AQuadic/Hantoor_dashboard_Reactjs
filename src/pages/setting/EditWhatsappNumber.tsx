import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import DashboardInput from "@/components/general/DashboardInput";
import { Select, SelectItem } from "@heroui/react";

import { getRequestFinancingById } from "@/api/financing/getFinancinyById";
import { Country, getCountries } from "@/api/countries/getCountry";
import Loading from "@/components/general/Loading";
import { updateRequestFinancing } from "@/api/financing/editFinancing";

const EditWhatsappNumber = () => {
  const { t, i18n } = useTranslation("setting");
  const { id } = useParams<{ id: string }>();

  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(1, ""),
  });
  const countries: Country[] = data?.data ?? [];

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getRequestFinancingById(Number(id));
        if (data) {
          setPhone(data.phone || "");
          setSelectedCountry(data.country_id?.toString() || null);
        }
      } catch (err: any) {
        toast.error(err.message || t("somethingWentWrong"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, t]);

  const handleSave = async () => {
    if (!id) return;

    if (!selectedCountry) {
      toast.error(t("pleaseSelectCountry"));
      return;
    }
    if (!phone) {
      toast.error(t("pleaseEnterPhone"));
      return;
    }

    try {
      const res = await updateRequestFinancing({
        id: Number(id),
        country_id: Number(selectedCountry),
        phone: phone,
        is_active: true,
      });

      toast.success(res.message || t("PhoneUpdatedSuccessfully"));
      navigate("/settings?section=Insurance+Price+Request+Button");

    } catch (err: any) {
      toast.error(err.message || t("somethingWentWrong"));
    }

  };

  if (loading) return <Loading />

  return (
    <section>
      <div className="pt-0 pb-0 bg-white ">
        <DashboardHeader
          titleAr="تعديل رقم الوتساب"
          titleEn="Edit WhatsApp number"
          items={[
            { titleAr: "لوحة التحكم", titleEn: "Dashboard", link: "/" },
            { titleAr: "الاعدادات", titleEn: "Setting", link: "/" },
            { titleAr: "تعديل رقم الوتساب", titleEn: "Edit WhatsApp number" },
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
              onChange={(val: string) => {
                const numericValue = val.replace(/\D/g, "");
                setPhone(numericValue);
              }}
              placeholder={t("writeHere")}
            />
          </div>
        </div>
        <DashboardButton titleAr="حفظ" titleEn="Save" onClick={handleSave} />
      </div>
    </section>
  );
};

export default EditWhatsappNumber;
