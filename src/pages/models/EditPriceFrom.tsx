import { Country, getCountries } from "@/api/countries/getCountry";
import DashboardButton from "@/components/general/dashboard/DashboardButton";
import DashboardHeader from "@/components/general/dashboard/DashboardHeader";
import { Input, Select, SelectItem } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router";
import { updatePriceFrom } from "@/api/models/pricefrom/updatePriceFrom";
import toast from "react-hot-toast";

const EditPriceFrom = () => {
  const { t, i18n } = useTranslation("models");
  const params = useParams();
  const navigate = useNavigate();
  const priceId = Number(params.id);
  const [priceAr, setPriceAr] = useState("");
  const [priceEn, setPriceEn] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const isEdit = Boolean(priceId);

  const { data: countriesData, isLoading, isError } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(),
  });

  const handleSave = async () => {
    if (!priceAr && !priceEn) {
      toast.error(t("pleaseEnterPrice"));
      return;
    }

    try {
      await updatePriceFrom(priceId, { name: priceAr || priceEn });
      toast.success(t("savedSuccessfully"));
      navigate("/models?section=Price From")
    } catch (error: any) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error(t("error"));
    }
  }
  };

  return (
    <div>
      <DashboardHeader
        titleAr="تعديل السعر"
        titleEn="Edit the price"
        items={[
          {
            titleAr: "لوحة التحكم",
            titleEn: "dashboard",
            link: "/",
          },
          {
            titleAr: "اقسام السيارات ",
            titleEn: " Car Sections",
            link: "/models",
          },
          {
            titleAr:"تعديل السعر",
            titleEn: "Edit the price",
            link: isEdit ? `/price-from/edit/${priceId}` : "/price-from/add",
          },
        ]}
      />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-2xl">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label={t('arPrice')}
                variant="bordered"
              placeholder={t('writeHere')}
                classNames={{ label: "mb-2 text-base" }}
                size="lg"
                value={priceAr}
                onChange={(e) => setPriceAr(e.target.value)}
              />
              <Select
                className="mt-4"
                size="lg"
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
                      i18n.language === "ar"
                        ? country.name.ar
                        : country.name.en
                    }
                  >
                    {i18n.language === "ar"
                      ? country.name.ar
                      : country.name.en}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Input
              label={t('enPrice')}
              variant="bordered"
              placeholder={t('writeHere')}
              className="flex-1"
              classNames={{ label: "mb-2 text-base" }}
              size="lg"
              value={priceEn}
              onChange={(e) => setPriceEn(e.target.value)}
            />
          </div>

          <DashboardButton
            titleAr="حفظ"
            titleEn="Save"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default EditPriceFrom;
