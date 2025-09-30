import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getCountries, Country } from "@/api/countries/getCountry";
import toast from "react-hot-toast";
import { createPriceFrom } from "@/api/models/priceFrom/addPriceFrom";

const AddPriceFrom = () => {
  const { t, i18n } = useTranslation("models");
  const [arPrice, setArPrice] = useState("");
  const [enPrice, setEnPrice] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams();
  const brandId = params.id;
  const isEdit = Boolean(brandId);

  const {
    data: countriesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(),
  });

  const handleSubmit = async () => {
    if (arPrice !== enPrice) {
      toast.dismiss();
      toast.error(t("priceMustMatch"));
      return;
    }

    try {
      await createPriceFrom({
        name: arPrice,
        country_id: Number(selectedCountry),
      });
      toast.success(t("priceAddedSuccessfully"));
      navigate("/models?section=Price From");
    } catch (error: any) {
      if (error.response) {
        const apiMessage = error.response.data.message || t("error");
        toast.error(apiMessage);
      }
    }
  };

  return (
    <div>
      <DashboardHeader
        titleAr="اضافة سعر جديد"
        titleEn="Add a new price"
        items={[
          {
            titleAr: "الصفحة الرئيسية",
            titleEn: "Home",
            link: "/",
          },
          {
            titleAr: "اقسام السيارات ",
            titleEn: " Car Sections",
            link: "/models",
          },
          {
            titleAr: "اضافة سعر جديد",
            titleEn: "Add a new price",
            link: isEdit ? `/model/${brandId}` : "/brands/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label={t("arPrice")}
                variant="bordered"
                placeholder={t("writeHere")}
                value={arPrice}
                onChange={(e) => setArPrice(e.target.value)}
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
              />
              <Select
                className="mt-4"
                size={"lg"}
                variant="bordered"
                label={t("country")}
                selectedKeys={selectedCountry ? [selectedCountry] : []}
                onSelectionChange={(keys) =>
                  setSelectedCountry(Array.from(keys)[0] as string)
                }
                isDisabled={isLoading || isError}
              >
                {(countriesData?.data || []).map((country: Country) => (
                  <SelectItem
                    key={country.id}
                    textValue={
                      i18n.language === "ar" ? country.name.ar : country.name.en
                    }
                  >
                    {i18n.language === "ar" ? country.name.ar : country.name.en}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Input
              label={t("enPrice")}
              variant="bordered"
              placeholder={t("writeHere")}
              value={enPrice}
              onChange={(e) => setEnPrice(e.target.value)}
              className="flex-1"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
            />
          </div>

          <DashboardButton
            titleAr="اضافة"
            titleEn="Add"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPriceFrom;
