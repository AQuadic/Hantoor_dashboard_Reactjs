import React from "react";
import { Checkbox, DatePicker, Input } from "@heroui/react";
import DatePickerIcon from "@/components/icons/general/DatePickerIcon";
import { getLocalTimeZone, today, parseDate } from "@internationalized/date";
import { useTranslation } from "react-i18next";
import { useVehicleForm } from "@/contexts/VehicleFormContext";
import { useQuery } from "@tanstack/react-query";
import { getAllCountries, Country } from "@/api/countries/getCountry";

const CarPrices = () => {
  const { t, i18n } = useTranslation("cars");
  const { formData, updateField } = useVehicleForm();

  const { data: allCountries = [] } = useQuery<Country[], Error>({
    queryKey: ["allCountries"],
    queryFn: () => getAllCountries(),
  });

  // Calculate discounted price
  const discountedPrice =
    formData?.price && formData?.discount_value
      ? parseFloat(formData.price) -
        (parseFloat(formData.price) * parseFloat(formData.discount_value)) / 100
      : parseFloat(formData?.price || "0");

  const selectedCountry = allCountries.find(
    (c) => c.id.toString() === formData?.country_id?.toString()
  );

  const currencyText =
    selectedCountry?.currency_text?.[i18n.language as "ar" | "en"] || "";

  return (
    <div className="bg-white mt-3 rounded-[15px] py-[19px] px-[29px]">
      <h1 className="text-lg text-primary font-bold mb-2">{t("carPrice")}</h1>
      <div className="flex gap-4 ">
        <Input
          value={formData?.price || ""}
          onChange={(e) => updateField?.("price", e.target.value)}
          type="number"
          label={`${t("price")} *`}
          variant="bordered"
          placeholder={t("writeHere")}
          classNames={{ label: "mb-2 text-base" }}
          size="lg"
          className="w-1/4"
        />
        <div className="bg-[#2E7CBE1A] w-1/4 px-5 py-4 flex items-center justify-between rounded-2xl">
          <span>{currencyText}</span>
          <span className="text-xl font-bold text-primary">
            {formData?.price || 0}
          </span>
        </div>
      </div>

      {/* تفعيل الخصم */}
      <Checkbox
        isSelected={formData?.is_discount || false}
        onValueChange={(value) => updateField?.("is_discount", value)}
        className="text-[#606060] my-3"
      >
        {t("priceDiscount")}
      </Checkbox>

      {/* بيانات الخصم */}
      {formData?.is_discount && (
        <div className="flex items-center gap-4">
          {/* نسبة الخصم */}
          <Input
            max={100}
            value={formData?.discount_value || ""}
            onChange={(e) => updateField?.("discount_value", e.target.value)}
            type="number"
            label={t("discountPercentage")}
            variant="bordered"
            placeholder={t("writeHere")}
            classNames={{ label: "mb-2 text-base" }}
            size="lg"
            className="w-1/4"
          />
          <DatePicker
            size="lg"
            variant="bordered"
            className="w-1/4"
            label={t("discountFromDate")}
            selectorIcon={<DatePickerIcon />}
            minValue={today(getLocalTimeZone())}
            value={
              formData?.discount_from_date
                ? parseDate(formData.discount_from_date)
                : null
            }
            onChange={(date) =>
              updateField?.(
                "discount_from_date",
                date?.toString().split("T")[0] || ""
              )
            }
          />

          <DatePicker
            size="lg"
            variant="bordered"
            className="w-1/4"
            label={t("discountToDate")}
            selectorIcon={<DatePickerIcon />}
            minValue={today(getLocalTimeZone())}
            value={
              formData?.discount_to_date
                ? parseDate(formData.discount_to_date.split(" ")[0])
                : null
            }
            onChange={(date) =>
              updateField?.(
                "discount_to_date",
                date?.toString().split("T")[0] || ""
              )
            }
          />

          {/* السعر بعد الخصم */}
          <div className="bg-[#2E7CBE1A] w-1/4 px-5 py-4 flex items-center justify-between rounded-2xl">
            <span>{t("priceAfterDiscount")}</span>
            <span className="text-xl font-bold text-primary">
              {discountedPrice}
            </span>
          </div>
        </div>
      )}

      {/* خيارات إضافية */}
      <div className="mt-4  w-[calc(50%+16px)] h-[46px] border border-[#DBDEE1] rounded-[34px] flex items-center px-4 gap-16">
        <Checkbox
          isSelected={formData?.is_include_tax || false}
          onValueChange={(value) => updateField?.("is_include_tax", value)}
          size="md"
        >
          <p className="text-[#1E1B1B] md:text-base text-sm font-normal">
            {t("taxIncluded")}
          </p>
        </Checkbox>
        <Checkbox
          isSelected={formData?.is_include_warranty || false}
          onValueChange={(value) => updateField?.("is_include_warranty", value)}
          size="md"
        >
          <p className="text-[#1E1B1B] md:text-base text-sm font-normal">
            {t("warrantyIncluded")}
          </p>
        </Checkbox>
        <Checkbox
          isSelected={formData?.is_Insurance_warranty || false}
          onValueChange={(value) =>
            updateField?.("is_Insurance_warranty", value)
          }
          size="md"
        >
          <p className="text-[#1E1B1B] md:text-base text-sm font-normal">
            {t("insuranceIncluded")}
          </p>
        </Checkbox>
      </div>
    </div>
  );
};

export default CarPrices;
